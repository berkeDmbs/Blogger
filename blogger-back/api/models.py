from django.db import models
from django.conf import settings

class Blog_post(models.Model):
    title = models.CharField(max_length = 100)
    post = models.TextField()
    pub_date = models.DateField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.title