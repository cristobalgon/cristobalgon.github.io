from django.urls import path

from Tarea1App import views

urlpatterns = [
    path('', views.home, name='Home'),
    path('usuarios/', views.usuarios, name='Usuarios'),
    path('ciudades/', views.ciudades, name='Ciudades'),
]
