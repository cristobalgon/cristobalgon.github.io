from django.shortcuts import render, HttpResponse

import requests

# Create your views here.

def home(request):

    return render(request, 'Tarea1App/home.html', {})

def usuarios(request, page):

    url = f'https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/27429/users?_page={page}'
    response = requests.get(url)
    if response.status_code == 200:
        response_json = response.json()

    numero = response.headers['X-Total-Count']
    maximo_pags = ( int(numero) + 9 ) // 10

    return render(request, 'Tarea1App/usuarios.html', {'usuarios': response_json, 'cantidad': numero, 'maximo_pags': maximo_pags, 'pagina': page})

def ciudades(request, page):

    url = f'https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/27429/cities?_page={page}'
    response = requests.get(url)
    
    if response.status_code == 200:
        response_json = response.json()
        for i in response_json:
            if '/' in i['name']:
                i['name'] = i['name'].replace('/',' ')

    numero = response.headers['X-Total-Count']
    maximo_pags = ( int(numero) + 9 ) // 10

    return render(request, 'Tarea1App/ciudades.html', {'ciudades': response_json, 'cantidad': numero, 'maximo_pags': maximo_pags, 'pagina': page})

def usuario(request, id):

    url = f'https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/27429/users/{id}'
    response = requests.get(url)
    if response.status_code == 200:
        detalle = response.json()

    url = f'https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/27429/users/{id}/credit-cards'
    response = requests.get(url)
    if response.status_code == 200:
        tarjetas = response.json()

    url = f'https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/27429/users/{id}/addresses'
    response = requests.get(url)
    if response.status_code == 200:
        direcciones = response.json()

    return render(request, 'Tarea1App/usuario.html', {'detalle': detalle, 'tarjetas': tarjetas, 'direcciones': direcciones})

def ciudad(request, name):

    url = f'https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/27429/cities?q={name}'
    response = requests.get(url)
    if response.status_code == 200:
        detalle = response.json()

    info = []    # queda  -->   [ {'ciudad': Washington, 'usuarios': [...]}. 'ciudad': Georgia, 'usuarios': [...] ]
    for ciudad in detalle:
        lista = ciudad['users']

        info.append( { 'ciudad': ciudad, 'usuarios': [] } )
        for id in lista:
            url = f'https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/27429/users/{id}'
            response = requests.get(url)
            if response.status_code == 200:
                info[-1]['usuarios'].append(response.json())

    return render(request, 'Tarea1App/ciudad.html', {'info': info})

def buscar_usuario(request):
    
    palabra = request.GET["palabra"]
    url = f'https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/27429/users?q={palabra}'
    response = requests.get(url)
    if response.status_code == 200:
        response_json = response.json()

    numero = response.headers['X-Total-Count']
    maximo_pags = ( int(numero) + 9 ) // 10

    return render(request, 'Tarea1App/usuarios.html', {'usuarios': response_json, 'cantidad': numero, 'maximo_pags': maximo_pags, 'pagina': 1})



def buscar_ciudad(request):
    
    palabra = request.GET["palabra"]

    url = f'https://us-central1-taller-integracion-310700.cloudfunctions.net/tarea-1-2021-2/27429/cities?q={palabra}'
    
    response = requests.get(url)

    if response.status_code == 200:
        response_json = response.json()

    numero = response.headers['X-Total-Count']
    maximo_pags = ( int(numero) + 9 ) // 10

    return render(request, 'Tarea1App/ciudades.html', {'ciudades': response_json, 'cantidad': numero, 'maximo_pags': maximo_pags, 'pagina': 1})
