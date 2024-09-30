from django.contrib import admin

from .models import register,work_details,product,task,jobs,leave1

class registeradmin(admin.ModelAdmin):
    list_display=('name','password','email','phone','access','created','modified')
admin.site.register(register,registeradmin)

class workadmin(admin.ModelAdmin):
    list_display=('user_id','salary','position','performance','joindate')
admin.site.register(work_details,workadmin)

class productadmin(admin.ModelAdmin):
    list_display=('product','description','cost','revenue','startdate','enddate','superior','status')
admin.site.register(product,productadmin)

class taskadmin(admin.ModelAdmin):
    list_display=('pro_id','task','get_emp_ids','deadline','completion','superior')

    def get_emp_ids(self,obj):
        return ', '.join(str(emp_id.id) for emp_id in obj.emp_id.all())
    get_emp_ids.short_description='Employees'

admin.site.register(task,taskadmin)

class jobadmin(admin.ModelAdmin):
    list_display=('position','requires')
admin.site.register(jobs,jobadmin)

class leaveadmin(admin.ModelAdmin):
    list_display=('emp_id','leave1','date1','permission')
admin.site.register(leave1,leaveadmin)