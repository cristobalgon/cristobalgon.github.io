from django.shortcuts import render, HttpResponse

import requests

# Create your views here.

def home(request):

    return render(request, 'Tarea1App/home.html', {})

def usuarios(request):

    url = 'https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/27429/users'
    
    response = requests.get(url)

    if response.status_code == 200:
        response_json = response.json()

    return render(request, 'Tarea1App/usuarios.html', {'usuarios': response_json})

def ciudades(request):

    url = 'https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/27429/cities'
    
    response = requests.get(url)

    if response.status_code == 200:
        response_json = response.json()

    return render(request, 'Tarea1App/ciudades.html', {'ciudades': response_json})