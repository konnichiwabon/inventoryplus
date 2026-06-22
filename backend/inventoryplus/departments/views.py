import json
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import Department, UserProfile

@csrf_exempt
def department_list(request):
    if request.method == 'GET':
        departments = Department.objects.all().order_by('department_id')
        data = []
        for d in departments:
            data.append({
                'id': d.department_id,
                'name': d.department_name,
            })
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            name = body.get('name')
            if not name:
                return JsonResponse({'error': 'Name is required'}, status=400)
            
            dept = Department.objects.create(department_name=name)
            return JsonResponse({
                'id': dept.department_id,
                'name': dept.department_name
            }, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def department_users_list(request, dept_name):
    dept = get_object_or_404(Department, department_name__iexact=dept_name)

    if request.method == 'GET':
        users = dept.users.all().order_by('user_id')
        data = []
        for u in users:
            data.append({
                'id': u.user_id,
                'username': u.username,
            })
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            username = body.get('username')
            if not username:
                return JsonResponse({'error': 'Username is required'}, status=400)

            user = UserProfile.objects.create(
                username=username,
                department=dept
            )
            return JsonResponse({
                'id': user.user_id,
                'username': user.username
            }, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
