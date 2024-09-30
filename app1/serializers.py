from rest_framework import serializers

from .models import register,work_details,task,jobs,product,leave1

class doserializer(serializers.ModelSerializer):
    class Meta:
        model=register
        fields=["id","name","email","phone","password","access"]

class doserializer1(serializers.ModelSerializer):
    class Meta:
        model=register
        fields=["email","password","access"]

class todoserializer(serializers.ModelSerializer):
    name1=serializers.CharField(source='user_id.name')
    class Meta:
        model=work_details
        fields=["id","user_id","name1","salary","position","performance","joindate"]

class todoserializer1(serializers.ModelSerializer):
    class Meta:
        model=work_details
        fields=["id","user_id","salary","position","performance","joindate"]

class productserializer(serializers.ModelSerializer):
    class Meta:
        model=product
        fields=["id","product","description","cost","revenue","startdate","enddate","superior","status"]

class taskserializer(serializers.ModelSerializer):
    class Meta:
        model=task
        fields=["id","pro_id","task","emp_id","assigned","deadline","completion","superior"]

class jobserializr(serializers.ModelSerializer):
    class Meta:
        model=jobs
        fields=["id","position","requires"]

class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user_id.name')

    class Meta:
        model = work_details
        fields = ['id', 'name', 'position']

class ProductSerializer(serializers.ModelSerializer):
    employees = serializers.SerializerMethodField()

    class Meta:
        model = product
        fields = ['id','product','description','cost','revenue','startdate','enddate','superior','status','employees']

    def get_employees(self, obj):
        tasks = task.objects.filter(pro_id=obj)
        employee_ids = set(emp.id for t in tasks for emp in t.emp_id.all())
        unique_employees = work_details.objects.filter(id__in=employee_ids)
        return EmployeeSerializer(unique_employees, many=True).data
    
class registerserializer(serializers.ModelSerializer):
    class Meta:
        model=register
        fields=['id','name']

class taskserializer1(serializers.ModelSerializer):
    product1=serializers.CharField(source='pro_id.product')
    employees=registerserializer(many=True,source='emp_id')
    class Meta:
        model=task
        fields=["id","pro_id","product1","task","assigned","deadline","completion","superior","employees"]

class leaveserializer(serializers.ModelSerializer):
    name=serializers.CharField(source='emp_id.name')
    class Meta:
        model=leave1
        fields=["id","emp_id","name","leave1","date1","permission"]

class leaveserializer1(serializers.ModelSerializer):
    class Meta:
        model=leave1
        fields=["id","emp_id","leave1","date1","permission"]