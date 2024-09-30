from django.urls import path,include,re_path
from rest_framework import routers
from . import views

router=routers.DefaultRouter()
router.register(r'register',views.doviewset)
router1=routers.DefaultRouter()
router1.register(r'details',views.todoviewset)
router2=routers.DefaultRouter()
router2.register(r'product',views.productviewset)
router3=routers.DefaultRouter()
router3.register(r'task',views.taskviewset)
router4=routers.DefaultRouter()
router4.register(r'jobs',views.jobviewset)
router5=routers.DefaultRouter()
router5.register(r'work',views.Empviewset)
router6=routers.DefaultRouter()
router6.register(r'task1',views.taskviewset1,basename="task1")

urlpatterns=[
    path('',include(router.urls)),
    path('',include(router1.urls)),
    path('',include(router2.urls)),
    path('',include(router3.urls)),
    path('',include(router4.urls)),
    path('',include(router5.urls)),
    path('',include(router6.urls)),
    path('main',views.main1,name="dashboard"),
    path('employee',views.emp,name="employee"),
    path('product',views.product1,name="product"),
    path('task',views.task1,name="task"),
    path('accounts',views.accounts,name="accounts"),
    path('jobs',views.jobs1,name="jobs"),
    path('register',views.register,name="register"),
]