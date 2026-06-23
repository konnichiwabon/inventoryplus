"""
URL configuration for inventoryplus project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from departments.views import department_list, department_users_list, user_workstation_specs, delete_user

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/departments/', department_list, name='department_list'),
    path('api/departments/<str:dept_name>/users/', department_users_list, name='department_users_list'),
    path('api/users/<int:user_id>/specs/', user_workstation_specs, name='user_workstation_specs'),
    path('api/users/<int:user_id>/', delete_user, name='delete_user'),
]
