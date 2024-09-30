from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Count
from rest_framework.decorators import action
from .models import register,work_details,product,task,jobs
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .serializers import doserializer,todoserializer,productserializer,taskserializer,jobserializr,ProductSerializer,taskserializer1
from rest_framework.viewsets import ModelViewSet
from collections import defaultdict

class doviewset(ModelViewSet):
    serializer_class=doserializer
    queryset=register.objects.all()

class standardpage(PageNumberPagination):
    page_size=5
    page_size_query_param='page_sites'
    max_page_size=10
class todoviewset(ModelViewSet):
    serializer_class=todoserializer
    queryset=work_details.objects.all().order_by('id')
    pagination_class=standardpage

    @action(detail=False,methods=['get'],url_path='empdate')
    def empdate(self,request,*args,**kwargs):
        counts=defaultdict(int)

        for work in self.queryset:
            day,month,year=work.joindate.split('-')
            month_year=f"{year}-{month}"
            counts[month_year]+=1

        response_data=[]
        total=0
        for month_year in sorted(counts.keys()):
            year,month = month_year.split('-')
            total+=counts[month_year]
            response_data.append({
                'year':year,
                'month':month,
                'count':total
            })

        return Response(response_data)
    
    @action(detail=False,methods=['get'],url_path='empcount')
    def empcount(self,request):
        tot_emp=work_details.objects.all().count()
        dupe=work_details.objects.values('position').annotate(count=Count('position')).filter(count__gt=1)
        dupe1=list(dupe)
        return Response({
            'total_employees_count':tot_emp,
            'position_details':dupe1,
        })

class productviewset(ModelViewSet):
    serializer_class=productserializer
    queryset=product.objects.all().order_by('id')
    
    @action(detail=False,methods=['get'],url_path='revenue_summary')
    def revenue_summary(self,request):
        products=product.objects.all()
        total_cost=sum(int(p.cost) for p in products if p.cost)
        total_revenue=sum(int(p.revenue) for p in products if p.revenue)
        profit_percentage=int(((total_revenue-total_cost)/total_cost) * 100)

        return Response({
            'total_cost':total_cost,
            'total_revenue':total_revenue,
            'profit_percentage':profit_percentage,
        })

class taskviewset(ModelViewSet):
    serializer_class=taskserializer
    queryset=task.objects.all()

class jobviewset(ModelViewSet):
    serializer_class=jobserializr
    queryset=jobs.objects.all()

def main1(request):
    return render(request,"main.html")

def emp(request):
    return render(request,"employee.html")

def product1(request):
    return render(request,"product.html")

def task1(request):
    return render(request,"task.html")

def accounts(request):
    return render(request,"accounts.html")

def jobs1(request):
    return render(request,"jobs.html")

class Empviewset(ModelViewSet):
    serializer_class=ProductSerializer
    queryset=product.objects.all().order_by('id')

class taskviewset1(ModelViewSet):
    serializer_class=taskserializer1
    queryset=task.objects.all().order_by('id')