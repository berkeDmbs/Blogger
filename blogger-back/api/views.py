import django
from django.contrib.auth.models import User
from .models import Blog_post
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core import serializers
from django.contrib.auth import login, logout, authenticate
import datetime

@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serialized_users = serializers.serialize('json', users)
    return Response(serialized_users)

@api_view(['GET'])
def user_logout(request):
    logout(request)
    return Response(data="Logged Out", status=status.HTTP_200_OK)

@api_view(["GET"])
def is_authenticated(request):
    if request.user.is_authenticated:
        return Response(serializers.serialize('json', [request.user]), status=status.HTTP_200_OK)
    else:
        return Response(data="User not authenticated", status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
def user_login(request):
    username = request.data['username']
    password = request.data['password']
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return Response(serializers.serialize('json', [user]), status=status.HTTP_200_OK)
    else:
        return Response(data='Invalid request', status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def user_register(request):
    firstname = request.data['firstname']
    lastname = request.data['lastname']
    username = request.data['username']
    password = request.data['password']

    user_exists = False
    try:
        User.objects.get(username=username)
        user_exists = True
    except:
        print("User doesn't exist")
    
    if not user_exists:
        user = User.objects.create_user(username=username, password=password, first_name=firstname, last_name=lastname)
        return Response(serializers.serialize('json', [user]), status=status.HTTP_200_OK)
    else:
        return Response(data='User already exists', status=status.HTTP_403_FORBIDDEN)
    
@api_view(['GET', 'POST'])
def blog_post(request):
    if(request.method == 'GET'):
        ctoken = django.middleware.csrf.get_token(request)
        blog_posts = Blog_post.objects.all()
        return Response(data=serializers.serialize('json', blog_posts), status = status.HTTP_200_OK, headers= {"X-CSRFTOKEN": ctoken})
    
    elif(request.method == 'POST'):
        new_blog_post = Blog_post.objects.create(
            title = request.data['title'],
            post = request.data['post'],
            pub_date = datetime.datetime.now(),
            user = request.user
        )
        new_blog_post.save()
        return Response(serializers.serialize('json',[new_blog_post]), status= status.HTTP_200_OK)
    else:
        return Response(data="Not Allowed", status = status.HTTP_403_FORBIDDEN)
    
@api_view(['GET','POST'])
def search(request):
    if (request.method == 'GET'):
        searched_pk = request.GET.get('pk')
        result = Blog_post.objects.get(pk=searched_pk)
        return Response(serializers.serialize('json', [result]), status=status.HTTP_200_OK)
    
    if(request.method == 'POST'):
        search_query = request.data['search_query']
        title_results = Blog_post.objects.filter(title__icontains=search_query)
        post_results = Blog_post.objects.filter(post__icontains=search_query)
        results = title_results | post_results 
        return Response(serializers.serialize('json', results), status= status.HTTP_200_OK)

@api_view(['GET','POST'])
def profile(request):
    if (request.method == 'GET'):
        if request.user.is_authenticated:
            ctoken = django.middleware.csrf.get_token(request)
            return Response(serializers.serialize('json', [request.user]), status= status.HTTP_200_OK, headers= {"X-CSRFTOKEN": ctoken})
        else:
            return Response("User not authenticated", status=status.HTTP_403_FORBIDDEN)
        
    if(request.method == 'POST'):
        firstname = request.data['firstname'] 
        lastname = request.data['lastname'] 
        username = request.data['username']

        if(firstname is None or lastname is None or username is None):
            return Response(data="Empty field(s)", status=status.HTTP_403_FORBIDDEN)
        
        current_user = User.objects.get(pk=request.data['pk'])
        current_user.first_name = firstname
        current_user.last_name = lastname
        current_user.username = username
        current_user.save()
        return Response(data="OK", status=status.HTTP_200_OK)