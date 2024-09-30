from django.shortcuts import render,redirect
from rest_framework.decorators import action,api_view
from django.contrib.auth import logout
from app1.models import register,work_details,product,task,jobs,leave1
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.viewsets import ModelViewSet
from app1.serializers import doserializer,todoserializer,productserializer,taskserializer,jobserializr,todoserializer1,doserializer1,leaveserializer,leaveserializer1

def emp1(request):
    return render(request,"employee1.html")

def pro1(request):
    return render(request,"pro.html")

def task1(request):
    return render(request,"task1.html")

def jobs1(request):
    return render(request,"job.html")

def user2(request):
    return render(request,"users.html")

def leave(request):
    return render(request,"leave.html")

def leave2(request):
    return render(request,"adminleave.html")


@api_view(['POST'])
def register2(request):
    serializer=doserializer(data=request.data)
    if register.objects.filter(name=request.data.get('name')).exists() or \
       register.objects.filter(email=request.data.get('email')).exists():
       return Response({"error": "This data already exists"}, status=status.HTTP_400_BAD_REQUEST)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=200)
    else:
        return Response(status=404)
    

@api_view(['POST'])
def login1(request):
    serializer=doserializer1(data=request.data)
    if not serializer.is_valid():
        return Response({'eror':'the data is invalid'},status=400)
    
    email=serializer.validated_data.get('email')
    password=serializer.validated_data.get('password')
    try:
        user = register.objects.get(email=email, password=password)
        request.session['name'] = user.name
        request.session['id'] = user.id
        
        access_level = user.access
        return Response({'access': access_level}, status=200)
    except register.DoesNotExist:
        return Response({'error': 'Invalid email or password'}, status=400)
def login2(request):
    return render(request,'login.html')

def logout1(request):
    logout(request)
    return redirect(login2)

class standardpage(PageNumberPagination):
    page_size=5
    page_size_query_param='page_sites'
    max_page_size=10

class empviewset(ModelViewSet):
    serializer_class=todoserializer
    queryset=work_details.objects.all().order_by('id')
    pagination_class=standardpage

class empviewset1(ModelViewSet):
    serializer_class=todoserializer1
    queryset=work_details.objects.all().order_by('id')

class regviewset(ModelViewSet):
    serializer_class=doserializer
    queryset=register.objects.filter(access='user').order_by('id')

class productviewset(ModelViewSet):
    serializer_class=productserializer
    queryset=product.objects.all().order_by('id')
    pagination_class=standardpage

class taskviewset(ModelViewSet):
    serializer_class=taskserializer
    queryset=task.objects.all().order_by('id')
    pagination_class=standardpage

class jobviewset(ModelViewSet):
    serializer_class=jobserializr
    queryset=jobs.objects.all().order_by('id')
    pagination_class=standardpage
def register1(request):
    return render(request,'register.html')

class leviewset(ModelViewSet):
    serializer_class=leaveserializer
    queryset=leave1.objects.all().order_by('id')

class leviewset1(ModelViewSet):
    serializer_class=leaveserializer1
    queryset=leave1.objects.all().order_by('id')