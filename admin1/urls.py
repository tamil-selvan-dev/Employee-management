from django.urls import path,include,re_path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from . import views

router=routers.DefaultRouter()
router.register(r'work1',views.empviewset)
router1=routers.DefaultRouter()
router1.register(r'user',views.regviewset)
router2=routers.DefaultRouter()
router2.register(r'work2',views.empviewset1)
router3=routers.DefaultRouter()
router3.register(r'product1',views.productviewset)
router4=routers.DefaultRouter()
router4.register(r'task2',views.taskviewset)
router5=routers.DefaultRouter()
router5.register(r'jobs2',views.jobviewset)
router6=routers.DefaultRouter()
router6.register(r'leave1',views.leviewset)
router7=routers.DefaultRouter()
router7.register(r'leave3',views.leviewset1)

urlpatterns=[
    #path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    #path('api/token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('emp',views.emp1,name="emp"),
    path('pro',views.pro1,name="pro1"),
    path('task3',views.task1,name="task3"),
    path('jobs1',views.jobs1,name="jobs1"),
    path('register1',views.register1,name="register1"),
    path('register2',views.register2,name="register2"),
    path('login',views.login1,name="login"),
    path('login1',views.login2,name="login1"),
    re_path(r'^logout/$',views.logout1,name='logout'),
    path('user2',views.user2,name="user2"),
    path('leave',views.leave,name="leave"),
    path('leave2',views.leave2,name="leave2"),
    path('',include(router.urls)),
    path('',include(router1.urls)),
    path('',include(router2.urls)),
    path('',include(router3.urls)),
    path('',include(router4.urls)),
    path('',include(router5.urls)),
    path('',include(router6.urls)),
    path('',include(router7.urls)),
]