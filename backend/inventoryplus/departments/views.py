import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Department

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
