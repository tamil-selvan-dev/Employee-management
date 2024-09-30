from django.db import models

class register(models.Model):

    ACCESS_CHOICES=[
        ('superuser','superuser'),
        ('admin','admin'),
        ('user','user'),
    ]

    name=models.CharField(max_length=20)
    email=models.EmailField()
    phone=models.CharField(max_length=15)
    password=models.CharField(max_length=20)
    access=models.CharField(max_length=20,choices=ACCESS_CHOICES,default='user',null=True)
    created=models.DateTimeField(auto_now_add=True)
    modified=models.DateTimeField(auto_now=True)


    def __str__(self):
        return str(self.id)

class work_details(models.Model):
    user_id=models.ForeignKey(register,on_delete=models.CASCADE,related_name='work_details')
    salary=models.IntegerField(null=True)
    position=models.CharField(max_length=20)
    performance=models.CharField(max_length=20)
    joindate=models.CharField(max_length=20)

    def __str__(self):
        return str(self.user_id)
    
class product(models.Model):

    STATUS=(
        ('ongoing','ongoing'),
        ('completed','completed'),
        ('upcoming','upcoming')
    )

    product=models.CharField(max_length=30)
    description=models.CharField(max_length=200)
    cost=models.CharField(max_length=20)
    revenue=models.CharField(max_length=20)
    startdate=models.DateTimeField(auto_now_add=True)
    enddate=models.DateTimeField(auto_now=True)
    superior=models.CharField(max_length=20)
    status=models.CharField(max_length=25,null=True,choices=STATUS)

    def __str__(self):
        return str(self.id)
    
class task(models.Model):
    pro_id=models.ForeignKey(product,on_delete=models.CASCADE)
    task=models.CharField(max_length=20)
    emp_id=models.ManyToManyField(register,blank=True)
    assigned=models.CharField(max_length=20)
    deadline=models.CharField(max_length=20)
    completion=models.CharField(max_length=20)
    superior=models.CharField(max_length=20)

    def __str__(self):
        #emp_list=', '.join(emp_ids.id for emp_ids in self.emp_id.all())
        #return f"pro_id:{self.pro_id} | task : {self.task} | assigned :{self.assigned} | deadline:{self.deadline} | completion:{self.completion} | superior :{self.superior} | emp_ids:{emp_list}"
        return str(self.id)
        
class jobs(models.Model):
    position=models.CharField(max_length=20)
    requires=models.IntegerField(null=True)

    def __str__(self):
        return str(self.id)
    
class leave1(models.Model):

    PERMISSION=(
        ('pending','pending'),
        ('yes','yes'),
        ('no','no')
    )
    emp_id=models.ForeignKey(register,on_delete=models.CASCADE)
    leave1=models.CharField(max_length=20)
    date1=models.CharField(max_length=20)
    permission=models.CharField(max_length=20,null=True,choices=PERMISSION,default='pending')

    def __str__(self):
        return str(self.id)