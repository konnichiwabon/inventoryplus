import uuid
from django.db import models

class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'department'

    def __str__(self):
        return self.department_name or f"Department {self.department_id}"


class UserProfile(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, null=True, blank=True)
    email = models.CharField(max_length=255, null=True, blank=True)
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='users'
    )

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.username or f"User {self.user_id}"


class Asset(models.Model):
    asset_id = models.AutoField(primary_key=True)
    asset_uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    asset_tag = models.CharField(max_length=255, unique=True, null=True, blank=True)
    hostname = models.CharField(max_length=255, null=True, blank=True)
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assets'
    )
    user = models.ForeignKey(
        UserProfile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assets'
    )
    omada_username = models.CharField(max_length=255, null=True, blank=True)
    date_recorded = models.DateField(null=True, blank=True)
    os_version = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'assets'

    def __str__(self):
        return f"{self.asset_tag} - {self.hostname or 'No Hostname'}"


class Cpu(models.Model):
    cpu_id = models.AutoField(primary_key=True)
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='cpus'
    )
    model = models.CharField(max_length=255, null=True, blank=True)
    cores = models.IntegerField(null=True, blank=True)
    threads = models.IntegerField(null=True, blank=True)
    manufacturer = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'cpu'


class Ram(models.Model):
    ram_id = models.AutoField(primary_key=True)
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='rams'
    )
    serial_number = models.CharField(max_length=255, null=True, blank=True)
    model = models.CharField(max_length=255, null=True, blank=True)
    speed = models.CharField(max_length=255, null=True, blank=True)
    capacity = models.CharField(max_length=255, null=True, blank=True)
    slot_number = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'ram'


class Motherboard(models.Model):
    motherboard_id = models.AutoField(primary_key=True)
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='motherboards'
    )
    serial_number = models.CharField(max_length=255, null=True, blank=True)
    bios_serial_number = models.CharField(max_length=255, null=True, blank=True)
    manufacturer = models.CharField(max_length=255, null=True, blank=True)
    model = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'motherboard'


class Gpu(models.Model):
    gpu_id = models.AutoField(primary_key=True)
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='gpus'
    )
    serial_number = models.CharField(max_length=255, null=True, blank=True)
    manufacturer = models.CharField(max_length=255, null=True, blank=True)
    model = models.CharField(max_length=255, null=True, blank=True)
    vram = models.CharField(max_length=255, null=True, blank=True)
    driver_version = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'gpu'


class Storage(models.Model):
    storage_id = models.AutoField(primary_key=True)
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='storages'
    )
    serial_number = models.CharField(max_length=255, null=True, blank=True)
    type = models.CharField(max_length=255, null=True, blank=True)
    capacity = models.CharField(max_length=255, null=True, blank=True)
    interface = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'storage'


class Network(models.Model):
    network_id = models.AutoField(primary_key=True)
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='networks'
    )
    mac_address = models.CharField(max_length=255, null=True, blank=True)
    dhcp_enabled = models.BooleanField(null=True, blank=True)
    current_ip = models.CharField(max_length=255, null=True, blank=True)
    port_number = models.CharField(max_length=255, null=True, blank=True)
    vlan_id = models.CharField(max_length=255, null=True, blank=True)
    omada_username = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'network'


class Peripherals(models.Model):
    peripheral_id = models.AutoField(primary_key=True)
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='peripherals'
    )
    type = models.CharField(max_length=255, null=True, blank=True)
    brand = models.CharField(max_length=255, null=True, blank=True)
    model = models.CharField(max_length=255, null=True, blank=True)
    serial_number = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'peripherals'


class OperatingSystem(models.Model):
    os_id = models.AutoField(primary_key=True)
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='operating_systems'
    )
    name = models.CharField(max_length=255, null=True, blank=True)
    version = models.CharField(max_length=255, null=True, blank=True)
    architecture = models.CharField(max_length=255, null=True, blank=True)
    partition = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'operating_system'

    def __str__(self):
        return f"{self.name or 'OS'} {self.version or ''}"


class Monitor(models.Model):
    monitor_id = models.AutoField(primary_key=True)
    asset = models.ForeignKey(
        Asset,
        on_delete=models.CASCADE,
        related_name='monitors'
    )
    brand = models.CharField(max_length=255, null=True, blank=True)
    model = models.CharField(max_length=255, null=True, blank=True)
    resolution = models.CharField(max_length=255, null=True, blank=True)
    serial_number = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'monitor'

    def __str__(self):
        return f"{self.brand or 'Monitor'} {self.model or ''}"
