from django.urls import path

from Tarea1App import views

urlpatterns = [
    path('', views.home, name='Home'),
    path('usuarios/<int:page>', views.usuarios, name='Usuarios'),
    path('ciudades/<int:page>', views.ciudades, name='Ciudades'),
    path('usuario/<int:id>', views.usuario, name='Usuario'),
    path('ciudad/<str:name>', views.ciudad, name='Ciudad'),
    path('buscar_usuario/', views.buscar_usuario, name='Buscar_usuario'),
    path('buscar_ciudad/', views.buscar_ciudad, name='Buscar_ciudad'),
]
