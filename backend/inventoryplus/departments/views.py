import json
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import (
    Department, UserProfile, Asset, Cpu, Ram, Motherboard,
    Gpu, Storage, Network, Peripherals, OperatingSystem, Monitor
)

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
                'email': u.email,
            })
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            username = body.get('username')
            email = body.get('email')
            if not username:
                return JsonResponse({'error': 'Username is required'}, status=400)

            user = UserProfile.objects.create(
                username=username,
                email=email,
                department=dept
            )
            return JsonResponse({
                'id': user.user_id,
                'username': user.username,
                'email': user.email
            }, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def user_workstation_specs(request, user_id):
    user = get_object_or_404(UserProfile, user_id=user_id)

    if request.method == 'GET':
        asset = user.assets.first()
        if not asset:
            return JsonResponse({}, safe=False)

        assets_data = [
            {"label": "Asset Tag", "value": asset.asset_tag},
            {"label": "Hostname", "value": asset.hostname or ""},
            {"label": "Date Recorded", "value": asset.date_recorded.isoformat() if asset.date_recorded else ""}
        ]

        os_data = []
        for os_rec in asset.operating_systems.all().order_by('os_id'):
            os_data.append([
                {"label": "OS Name", "value": os_rec.name or ""},
                {"label": "OS Version", "value": os_rec.version or ""},
                {"label": "OS Architecture", "value": os_rec.architecture or ""},
                {"label": "Partition", "value": os_rec.partition or ""}
            ])

        mb = asset.motherboards.first()
        mb_data = []
        if mb:
            mb_data = [
                {"label": "MB Manufacturer", "value": mb.manufacturer or ""},
                {"label": "MB Model", "value": mb.model or ""},
                {"label": "MB Serial Number", "value": mb.serial_number or ""},
                {"label": "BIOS Serial Number", "value": mb.bios_serial_number or ""}
            ]

        cpu = asset.cpus.first()
        cpu_data = []
        if cpu:
            cpu_data = [
                {"label": "CPU Manufacturer", "value": cpu.manufacturer or ""},
                {"label": "CPU Model", "value": cpu.model or ""},
                {"label": "CPU Cores", "value": str(cpu.cores) if cpu.cores is not None else ""},
                {"label": "CPU Threads", "value": str(cpu.threads) if cpu.threads is not None else ""}
            ]

        ram_data = []
        for r in asset.rams.all().order_by('ram_id'):
            ram_data.append([
                {"label": "RAM Capacity", "value": r.capacity or ""},
                {"label": "RAM Speed", "value": r.speed or ""},
                {"label": "RAM Model", "value": r.model or ""},
                {"label": "RAM Slot Number", "value": r.slot_number or ""},
                {"label": "RAM Serial Number", "value": r.serial_number or ""}
            ])

        storage_data = []
        for s in asset.storages.all().order_by('storage_id'):
            storage_data.append([
                {"label": "Storage Type", "value": s.type or ""},
                {"label": "Storage Capacity", "value": s.capacity or ""},
                {"label": "Storage Interface", "value": s.interface or ""},
                {"label": "Storage Serial Number", "value": s.serial_number or ""}
            ])

        gpu = asset.gpus.first()
        gpu_data = []
        if gpu:
            gpu_data = [
                {"label": "GPU Manufacturer", "value": gpu.manufacturer or ""},
                {"label": "GPU Model", "value": gpu.model or ""},
                {"label": "GPU VRAM", "value": gpu.vram or ""},
                {"label": "Driver Version", "value": gpu.driver_version or ""},
                {"label": "GPU Serial Number", "value": gpu.serial_number or ""}
            ]

        monitor_data = []
        for m in asset.monitors.all().order_by('monitor_id'):
            monitor_data.append([
                {"label": "Monitor Brand", "value": m.brand or ""},
                {"label": "Monitor Model", "value": m.model or ""},
                {"label": "Monitor Resolution", "value": m.resolution or ""},
                {"label": "Monitor Serial Number", "value": m.serial_number or ""}
            ])

        net = asset.networks.first()
        net_data = []
        if net:
            net_data = [
                {"label": "Current IP", "value": net.current_ip or ""},
                {"label": "MAC Address", "value": net.mac_address or ""},
                {"label": "DHCP Enabled", "value": "true" if net.dhcp_enabled else "false"},
                {"label": "Port Number", "value": net.port_number or ""},
                {"label": "VLAN ID", "value": net.vlan_id or ""},
                {"label": "Omada Username", "value": net.omada_username or ""}
            ]

        periph_data = []
        for p in asset.peripherals.all().order_by('peripheral_id'):
            periph_data.append([
                {"label": "Peripheral Type", "value": p.type or ""},
                {"label": "Peripheral Brand", "value": p.brand or ""},
                {"label": "Peripheral Model", "value": p.model or ""},
                {"label": "Peripheral Serial Number", "value": p.serial_number or ""}
            ])

        response_data = {
            "assets": assets_data,
            "os": os_data,
            "motherboard": mb_data,
            "cpu": cpu_data,
            "ram": ram_data,
            "storage": storage_data,
            "gpu": gpu_data,
            "monitor": monitor_data,
            "network": net_data,
            "peripherals": periph_data
        }
        return JsonResponse(response_data, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            
            # Helper to get value from label in list of dicts
            def get_val(item_list, label_name):
                if not item_list:
                    return ""
                for item in item_list:
                    if isinstance(item, dict) and item.get("label") == label_name:
                        return item.get("value", "")
                return ""

            assets_list = body.get("assets", [])
            if not assets_list:
                # Delete the asset and all cascaded specs
                user.assets.all().delete()
                return JsonResponse({"status": "deleted"})

            asset_tag = get_val(assets_list, "Asset Tag")
            hostname = get_val(assets_list, "Hostname")
            date_recorded_str = get_val(assets_list, "Date Recorded")

            asset = user.assets.first()
            if not asset:
                if not asset_tag:
                    asset_tag = f"AST-{user.user_id}"
                
                # Check for existing asset tag conflicts
                conflict = Asset.objects.filter(asset_tag=asset_tag).first()
                if conflict:
                    import random
                    asset_tag = f"{asset_tag}-{random.randint(100, 999)}"

                asset = Asset.objects.create(
                    asset_tag=asset_tag,
                    hostname=hostname,
                    user=user,
                    department=user.department
                )
            else:
                if asset_tag:
                    asset.asset_tag = asset_tag
                asset.hostname = hostname
                asset.save()

            if date_recorded_str:
                from datetime import datetime
                try:
                    asset.date_recorded = datetime.strptime(date_recorded_str, "%Y-%m-%d").date()
                    asset.save()
                except Exception:
                    pass

            # Update Operating System
            asset.operating_systems.all().delete()
            os_list = body.get("os", [])
            for os_group in os_list:
                if isinstance(os_group, list):
                    OperatingSystem.objects.create(
                        asset=asset,
                        name=get_val(os_group, "OS Name"),
                        version=get_val(os_group, "OS Version"),
                        architecture=get_val(os_group, "OS Architecture"),
                        partition=get_val(os_group, "Partition")
                    )

            # Update Motherboard
            asset.motherboards.all().delete()
            mb_list = body.get("motherboard", [])
            if mb_list:
                Motherboard.objects.create(
                    asset=asset,
                    manufacturer=get_val(mb_list, "MB Manufacturer"),
                    model=get_val(mb_list, "MB Model"),
                    serial_number=get_val(mb_list, "MB Serial Number"),
                    bios_serial_number=get_val(mb_list, "BIOS Serial Number")
                )

            # Update CPU
            asset.cpus.all().delete()
            cpu_list = body.get("cpu", [])
            if cpu_list:
                cores_str = get_val(cpu_list, "CPU Cores")
                threads_str = get_val(cpu_list, "CPU Threads")
                try:
                    cores = int(cores_str) if cores_str else None
                except ValueError:
                    cores = None
                try:
                    threads = int(threads_str) if threads_str else None
                except ValueError:
                    threads = None

                Cpu.objects.create(
                    asset=asset,
                    manufacturer=get_val(cpu_list, "CPU Manufacturer"),
                    model=get_val(cpu_list, "CPU Model"),
                    cores=cores,
                    threads=threads
                )

            # Update RAM
            asset.rams.all().delete()
            ram_list = body.get("ram", [])
            for ram_group in ram_list:
                if isinstance(ram_group, list):
                    Ram.objects.create(
                        asset=asset,
                        capacity=get_val(ram_group, "RAM Capacity"),
                        speed=get_val(ram_group, "RAM Speed"),
                        model=get_val(ram_group, "RAM Model"),
                        slot_number=get_val(ram_group, "RAM Slot Number"),
                        serial_number=get_val(ram_group, "RAM Serial Number")
                    )

            # Update Storage
            asset.storages.all().delete()
            storage_list = body.get("storage", [])
            for s_group in storage_list:
                if isinstance(s_group, list):
                    Storage.objects.create(
                        asset=asset,
                        type=get_val(s_group, "Storage Type"),
                        capacity=get_val(s_group, "Storage Capacity"),
                        interface=get_val(s_group, "Storage Interface"),
                        serial_number=get_val(s_group, "Storage Serial Number")
                    )

            # Update GPU
            asset.gpus.all().delete()
            gpu_list = body.get("gpu", [])
            if gpu_list:
                if gpu_list and isinstance(gpu_list[0], list):
                    gpu_group = gpu_list[0]
                else:
                    gpu_group = gpu_list
                Gpu.objects.create(
                    asset=asset,
                    manufacturer=get_val(gpu_group, "GPU Manufacturer"),
                    model=get_val(gpu_group, "GPU Model"),
                    vram=get_val(gpu_group, "GPU VRAM"),
                    driver_version=get_val(gpu_group, "Driver Version"),
                    serial_number=get_val(gpu_group, "GPU Serial Number")
                )

            # Update Monitor
            asset.monitors.all().delete()
            monitor_list = body.get("monitor", [])
            for m_group in monitor_list:
                if isinstance(m_group, list):
                    Monitor.objects.create(
                        asset=asset,
                        brand=get_val(m_group, "Monitor Brand"),
                        model=get_val(m_group, "Monitor Model"),
                        resolution=get_val(m_group, "Monitor Resolution"),
                        serial_number=get_val(m_group, "Monitor Serial Number")
                    )

            # Update Network
            asset.networks.all().delete()
            net_list = body.get("network", [])
            if net_list:
                dhcp_str = get_val(net_list, "DHCP Enabled").lower()
                dhcp_enabled = True if dhcp_str == "true" else False
                Network.objects.create(
                    asset=asset,
                    current_ip=get_val(net_list, "Current IP"),
                    mac_address=get_val(net_list, "MAC Address"),
                    dhcp_enabled=dhcp_enabled,
                    port_number=get_val(net_list, "Port Number"),
                    vlan_id=get_val(net_list, "VLAN ID"),
                    omada_username=get_val(net_list, "Omada Username")
                )

            # Update Peripherals
            asset.peripherals.all().delete()
            periph_list = body.get("peripherals", [])
            for p_group in periph_list:
                if isinstance(p_group, list):
                    Peripherals.objects.create(
                        asset=asset,
                        type=get_val(p_group, "Peripheral Type"),
                        brand=get_val(p_group, "Peripheral Brand"),
                        model=get_val(p_group, "Peripheral Model"),
                        serial_number=get_val(p_group, "Peripheral Serial Number")
                    )

            return JsonResponse({"status": "success"})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

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
                'email': u.email,
            })
        return JsonResponse(data, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            username = body.get('username')
            email = body.get('email')
            if not username:
                return JsonResponse({'error': 'Username is required'}, status=400)

            user = UserProfile.objects.create(
                username=username,
                email=email,
                department=dept
            )
            return JsonResponse({
                'id': user.user_id,
                'username': user.username,
                'email': user.email
            }, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def delete_user(request, user_id):
    if request.method == 'DELETE':
        user = get_object_or_404(UserProfile, user_id=user_id)
        user.delete()
        return JsonResponse({"status": "deleted"}, status=200)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

