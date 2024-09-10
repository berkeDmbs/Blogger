from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_users, name='get_users'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.user_register, name='register'),
    path('authenticated/', views.is_authenticated, name='authenticated'),
    path('blog_post/', views.blog_post, name='blog_post'),
    path('search/', views.search, name='search'),
    path('profile/', views.profile, name='profile'),
]