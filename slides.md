---
theme: ./theme
title: Cloud Native y Modernización con
titleTemplate: "%s SUSE Rancher Prime & SUSE Virtualization · SUSE Exchange Murcia 2026"
info: |
  SUSE Exchange Murcia 2026 · Andrés Valero
author: Andrés Valero
transition: fade
mdc: true
routerMode: hash
layout: cover-geeko
subtitle: "SUSE Rancher Prime &\nSUSE Virtualization"
chapter: Punto de partida
nav: false
---

<!--
[0:00-0:20] Bienvenida. Hoy vamos a hablar de dos cosas que van juntas: cómo se gestiona Kubernetes en producción con SUSE Rancher Prime, y cómo SUSE Virtualization lleva sus máquinas virtuales a una plataforma hiperconvergente y abierta. Empezamos por lo que ya tienen en casa.
-->


---
layout: s
base: statement-dark
title: ¿Quién sigue teniendo servicios críticos en máquinas virtuales?
nav: false
geeko: { pose: hanging-left-amazed, anim: drop, x: 74, y: -9, w: 19, delay: 0.6 }
---

<!--
[0:20-1:05] Pido que levanten la mano. Espero a que se levanten casi todas.

Todos. Y está bien: la tramitación, las bases de datos y muchas aplicaciones de gestión funcionan, y funcionan bien, en máquinas virtuales. El reto empieza cuando todo lo nuevo se construye en otro sitio.
-->

---
layout: s
title: Lo que hoy frena la modernización
geeko: { pose: hanging-right-amazed, anim: swing, x: 80, y: -4, w: 14 }
---

<div class="g3" style="margin-top:10px;height:calc(100% - 10px)">
<div class="card c-pine">

### Coste

- Licencias que cambian en cada renovación
- Cabinas y hardware propietario que obligan a renovar
- Dos plataformas que pagar y mantener
- Presupuestos plurianuales difíciles de prever

</div>
<div class="card c-jungle">

### Complejidad

- VMs y contenedores en mundos separados
- Clústeres de Kubernetes, cada uno a su manera
- Parches y actualizaciones a mano, clúster a clúster
- Pocos perfiles expertos y difíciles de retener

</div>
<div class="card c-midnight">

### Dependencia

- Un proveedor decide precio y hoja de ruta
- Formatos cerrados que atan sus VMs y apps
- Datos y operación fuera de su control
- Salir parece un salto al vacío

</div>
</div>

<!--
[1:05-2:05] Tres frenos que escuchamos en todas las conversaciones. El primero es el coste: tras la compra de VMware por Broadcom, muchos clientes han visto paquetes obligatorios y renovaciones mucho más caras.

El segundo es la complejidad de mantener dos stacks. El tercero, el que más preocupa en el sector público, es la dependencia: cuando un solo proveedor decide el precio y la hoja de ruta, la planificación deja de estar en sus manos.

Cambiar un propietario por otro propietario solo aplaza el problema. Por eso proponemos una plataforma abierta, que no les ata a las decisiones comerciales de nadie, con SUSE como socio que responde de ella.
-->

---
layout: s
title: Arquitectura en capas
sources:
  - { label: Visión general, url: "https://documentation.suse.com/cloudnative/virtualization/v1.8/en/introduction/overview.html" }
---

<div class="dia">
  <div class="band" style="background:var(--suse-pine)">
    <div class="band-head"><BrandLogo product="rancher-prime" variant="neg-green-horizontal" :height="20" /></div>
    <div class="row">
      <div class="blk"><b>Identidad y RBAC</b></div>
      <div class="blk"><b>GitOps (Fleet)</b></div>
      <div class="blk"><b>Seguridad</b></div>
      <div class="blk"><b>Observabilidad</b></div>
      <div class="blk"><b>Asistente IA (Liz)</b></div>
    </div>
  </div>
  <div class="row">
    <div class="blk out"><b>Máquinas virtuales</b><small>Windows y Linux, vGPU, passthrough</small></div>
    <div class="blk out fog"><b>Clústeres importados, nube pública, K3s y RKE2</b><small>Contenedores y Kubernetes, con balanceador y CSI</small></div>
  </div>
  <div class="band" style="background:var(--suse-mint);border:1.5px solid var(--suse-jungle)">
    <div class="band-head"><BrandLogo product="virtualization" variant="pos-green-horizontal" :height="20" /><span>Hiperconvergente: 3 nodos para alta disponibilidad</span></div>
    <div class="row">
      <div class="blk"><b>KubeVirt + KVM</b><small>Cómputo de las VMs</small></div>
      <div class="blk"><b>SUSE Storage</b><small>Almacenamiento distribuido</small></div>
      <div class="blk"><b>Red</b><small>VLAN y varias NICs</small></div>
      <div class="blk"><b>RKE2</b><small>Kubernetes seguro</small></div>
    </div>
  </div>
  <div class="blk out fog" style="font-size:14px"><b style="display:inline">SUSE Linux Micro:</b> sistema operativo inmutable</div>
  <div class="blk out" style="font-size:14px"><b>Servidores estándar x86_64 o ARM64</b></div>
</div>

<!--
[2:05-3:20] Recorrer de abajo arriba.
- Servidores estándar x86_64 o ARM64 (sin mezclar arquitecturas en un clúster).
- SUSE Linux Micro, inmutable: se actualiza como una imagen, sin deriva de configuración.
- SUSE Virtualization: RKE2 como base, KubeVirt + KVM para las VMs, SUSE Storage para los discos, red con VLAN y varias NICs.
- Encima conviven VMs y clústeres invitados RKE2 para contenedores.
- Arriba, Rancher Prime gobierna todo: identidad, RBAC, GitOps, seguridad, observabilidad. Liz es el asistente de IA integrado en la consola de Rancher Prime: conoce el estado real de los clústeres y ayuda a diagnosticar y operar.

Versión de producción: 1.8 (último parche 1.8.2), con SUSE Linux Micro 6.2, RKE2 v1.35, KubeVirt 1.7 y SUSE Storage (Longhorn 1.11). La 1.9 de la comunidad existe, pero su nota de versión no recomienda actualizar aún. Cadencia: versión menor cada 4 meses y parches cada 2; no hay vuelta atrás de versión.

SUSE la define como "a modern, open, interoperable, hyperconverged infrastructure (HCI) solution built on Kubernetes".
-->

---
layout: s
base: section-dark
title: Kubernetes y VMs en producción
subtitle: Con SUSE Rancher Prime
chapter: Kubernetes
nav: dark
---

<!--
[3:20-3:35] Primera parte: Kubernetes en producción. No basta con instalar clústeres; hay que gobernarlos, actualizarlos y protegerlos todos igual, estén donde estén.
-->

---
layout: s
title: Rancher Prime gestiona todo su Kubernetes
sources:
  - { label: Clústeres en Rancher, url: "https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup" }
  - { label: "AKS, EKS y GKE", url: "https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/set-up-clusters-from-hosted-kubernetes-providers" }
  - { label: Registrar clústeres, url: "https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/register-existing-clusters" }
---

<div class="g6" style="margin-top:8px;height:calc(100% - 8px)">
<div class="card c-bar" style="--bar:var(--suse-pine)">
<h3 class="ico"><material-symbols-layers-outline style="color:var(--suse-pine)" />SUSE Virtualization</h3>

- VMs, imágenes y volúmenes en la misma consola
- Mismo acceso y RBAC de Rancher

</div>
<div class="card c-bar" style="--bar:var(--suse-jungle)">
<h3 class="ico"><material-symbols-developer-board-outline style="color:var(--suse-jungle)" />Bare metal y edge</h3>

- RKE2 o K3s en servidores que ya tienen
- Un comando de registro por nodo

</div>
<div class="card c-bar" style="--bar:var(--suse-midnight)">
<h3 class="ico"><material-symbols-dns-outline style="color:var(--suse-midnight)" />Virtualizado</h3>

- Rancher crea las VMs y monta el clúster
- SUSE Virtualization, vSphere o Nutanix

</div>
<div class="card c-bar" style="--bar:var(--suse-mint)">
<h3 class="ico"><material-symbols-cloud-outline style="color:var(--suse-jungle)" />Nube pública</h3>

- Nodos en Amazon EC2, Azure o Google Compute
- El mismo RKE2 que en su CPD

</div>
<div class="card c-bar" style="--bar:var(--suse-waterhole)">
<h3 class="ico"><material-symbols-widgets-outline style="color:var(--suse-waterhole)" />AKS, EKS y GKE</h3>

- Crear, editar y actualizar desde Rancher
- Mismo RBAC, monitorización y escaneos

</div>
<div class="card c-bar" style="--bar:var(--suse-persimmon)">
<h3 class="ico"><material-symbols-hub-outline style="color:var(--suse-persimmon)" />Cualquier otro</h3>

- Registrar clústeres existentes, sin reinstalar
- Quitarlo de Rancher no lo destruye

</div>
</div>

<!--
[3:35-4:50] Un único plano de control para todo el ciclo de vida, esté donde esté el clúster.
- SUSE Virtualization se importa en Rancher (Virtualization Management): hosts, VMs, imágenes y volúmenes, con la autenticación y el RBAC de Rancher.
- Rancher lanza RKE2 o K3s "on any bare metal server, cloud provider, or virtualization platform" (documentación de Rancher). Controladores de nodos para Amazon EC2, Azure, Google Compute Engine, vSphere, Nutanix y SUSE Virtualization (Harvester).
- AKS, EKS y GKE: Rancher los crea a través de las APIs de cada nube y permite editarlos y actualizarlos; los registrados tienen las mismas opciones que los creados desde Rancher (si se borran de Rancher no se destruyen).
- Cualquier otro clúster conforme se puede registrar: acceso, miembros, proyectos, catálogo, monitorización, logging y escaneos de seguridad.
- Para la Región: el CPD principal, las sedes y, si un día usan nube pública, todo bajo las mismas políticas.
-->

---
layout: s
title: SUSE Virtualization como IaaS desde Rancher
sources:
  - { label: Rancher, url: "https://docs.harvesterhci.io/v1.8/rancher/rancher-integration" }
  - { label: Nodos, url: "https://docs.harvesterhci.io/v1.8/rancher/node/node-driver" }
  - { label: Cloud provider, url: "https://docs.harvesterhci.io/v1.8/rancher/cloud-provider" }
---

<div class="dia" style="gap:18px;padding-top:6px">
  <div class="row" style="height:96px">
    <div class="card c-pine" style="text-align:left"><h3 class="ico"><material-symbols-hub-outline />Rancher Prime</h3><p>Un equipo pide un clúster: formulario o API, sin ticket</p></div>
    <div class="arrow">➔</div>
    <div class="card c-bar" style="--bar:var(--suse-jungle);border:1.5px solid var(--suse-pine);border-top:6px solid var(--suse-jungle)"><h3 class="ico" style="color:var(--suse-pine)"><material-symbols-developer-board-outline style="color:var(--suse-jungle)" />Driver de nodos</h3><p>Crea las VMs en SUSE Virtualization: imagen, red, CPU</p></div>
    <div class="arrow">➔</div>
    <div class="card c-jungle"><h3 class="ico"><material-symbols-dns-outline />Clúster RKE2</h3><p>Sus nodos son VMs, en pools que escalan</p></div>
  </div>
  <div class="band" style="background:var(--suse-fog);padding:10px 14px 14px">
    <div style="text-align:center;font-weight:600;font-size:13px;margin-bottom:10px">Lo que el clúster recibe de SUSE Virtualization</div>
    <div class="row">
      <div class="card c-bar" style="--bar:var(--suse-jungle)"><h3 class="ico"><material-symbols-alt-route style="color:var(--suse-jungle)" />Balanceadores</h3><p>Servicios Load Balancer vía cloud provider</p></div>
      <div class="card c-bar" style="--bar:var(--suse-waterhole)"><h3 class="ico"><material-symbols-storage style="color:var(--suse-waterhole)" />Volúmenes</h3><p>Discos persistentes vía driver CSI</p></div>
      <div class="card c-bar" style="--bar:var(--suse-persimmon)"><h3 class="ico"><material-symbols-build-circle-outline style="color:var(--suse-persimmon)" />Autorreparación</h3><p>Si un nodo cae, Rancher crea otro</p></div>
      <div class="card c-bar" style="--bar:var(--suse-pine)"><h3 class="ico"><material-symbols-verified-user-outline style="color:var(--suse-pine)" />Multi Tenant</h3><p>Cada equipo en su espacio, con RBAC</p></div>
    </div>
  </div>
</div>

<!--
[4:50-5:50] Aquí está la sinergia: SUSE Virtualization se convierte en su nube privada, y Rancher en el portal de esa nube.

El flujo real: un equipo pide un clúster en Rancher, desde el formulario o por API. El controlador de nodos de SUSE Virtualization, incluido en Rancher, crea las VMs con la imagen, la red y el tamaño definidos, y sobre ellas se despliega RKE2. Los nodos van en pools que se escalan cambiando un número.

Lo que el clúster recibe de la plataforma: el cloud provider le da servicios LoadBalancer con IPs del pool o por DHCP; el driver CSI le da volúmenes persistentes del almacenamiento de SUSE Virtualization; si un nodo pierde conectividad, Rancher crea otro automáticamente; y todo respeta el RBAC de Rancher, así que cada consejería ve solo lo suyo.

K3s sobre Virtualization es experimental: usar RKE2. Mensaje: lo que hoy pide un ticket a sistemas y tarda días, mañana es un formulario con las cuotas y permisos que defina la Región.
-->

---
layout: s
title: ¿Rancher Community o SUSE Rancher Prime?
lead: El mismo código abierto, con distinto compromiso detrás
geeko: { pose: sitting-confident, anim: bob, x: 86.5, y: 10.5, w: 9 }
sources:
  - { label: Ciclo de vida de productos SUSE, url: "https://www.suse.com/lifecycle/" }
  - { label: Política de soporte de Rancher Prime, url: "https://www.suse.com/support/rancher-prime/" }
  - { label: "Rancher v2.9.6, versión solo Prime", url: "https://github.com/rancher/rancher/releases/tag/v2.9.6" }
---

<div class="g2 with-lead">
<div class="card c-fog" style="border:1px solid var(--suse-fog)">

### Rancher Community

- El mismo código abierto, sin fabricante detrás
- Soporte de la comunidad, sin SLA
- Solo las versiones que se publican para la comunidad
- El riesgo en producción lo asume usted

</div>
<div class="card c-pine">

### SUSE Rancher Prime

- Soporte 24x7x365 con SLA
- Unos 18 meses por versión, parches exclusivos
- Parches y correcciones exclusivos de Prime
- Imágenes firmadas con SBOM, registro de confianza
- Application Collection: apps firmadas con SBOM, Prime Registry y SLSA
- Liz, asistente de IA, con MCP
- Clústeres virtuales

</div>
</div>

<!--
[11:20-12:20] Contexto, sin señalar a nadie: muchas administraciones empezaron con Rancher Community, y es una buena noticia. Es el mismo código abierto, así que pasar a Prime no obliga a rehacer la plataforma.

La diferencia está en el compromiso. Con Community no hay fabricante detrás ni SLA: si un servicio al ciudadano cae un sábado, la solución depende de foros y de su propio equipo. Con Prime hay soporte 24x7x365 con SLA.

Ciclo de vida: cada versión de Rancher Prime tiene unos 18 meses de soporte. Ejemplo, la versión actual, 2.15: disponible el 27 de agosto de 2026, mantenimiento hasta el 27 de febrero de 2027 y fin de vida el 27 de febrero de 2028. Además, algunas versiones de mantenimiento solo se publican para Prime (por ejemplo, Rancher v2.9.6 y v2.9.8).

En SUSE Virtualization pasa lo mismo: las versiones x.y.0 son Community y las de producción, como 1.8.1 y 1.8.2, se publican como Prime, con soporte hasta el 29 de diciembre de 2027.

Fuentes: suse.com/lifecycle (consultado el 26 oct 2026); rancher.com/products/rancher-platform; notas de versión de Rancher en GitHub.
-->

---
layout: s
base: section-dark
title: La apuesta por la hiperconvergencia
subtitle: "SUSE Virtualization: sus VMs sobre una base abierta"
chapter: Hiperconvergencia
nav: dark
---

<!--
[5:50-6:05] Segunda parte: la hiperconvergencia. Cómputo, almacenamiento y red en los mismos servidores estándar, para que sus máquinas virtuales pasen a una plataforma abierta sin dar un salto al vacío.
-->

---
layout: s
title: Se moderniza mejor con los dos
lead: Cada producto resuelve una parte. Juntos resuelven el problema
---

<div class="row with-lead" style="gap:10px;align-items:stretch">
<div class="card c-fog">
<div class="kicker">Opción 1</div>

### Solo SUSE Virtualization

- Sustituye el hipervisor
- VMs y clústeres en el mismo hardware
- Cada clúster se gestiona por separado

</div>
<div class="chip">+</div>
<div class="card c-mint">
<div class="kicker">Opción 2</div>

### Solo Rancher Prime

- Gobierna todo su Kubernetes
- Las VMs siguen en otra plataforma
- Dos modelos operativos, dos equipos

</div>
<div class="chip">➔</div>
<div class="card c-pine" style="border:2px solid var(--suse-jungle)">
<div class="tag">Solución recomendada</div>

### Los dos juntos

- Nube privada con autoservicio de clústeres
- VMs y Kubernetes, del CPD a la nube, en una consola
- Mismas políticas, seguridad y GitOps en todo

</div>
</div>

<!--
El mensaje central de la charla. No es "compren dos productos": es que cada uno solo deja la mitad del problema.
- Solo SUSE Virtualization: excelente sustituto del hipervisor, pero sin un plano de gestión común, cada clúster y cada sede se opera por su cuenta.
- Solo Rancher Prime: gobierna Kubernetes en cualquier sitio, pero las VMs siguen en el hipervisor antiguo, con su licencia y su equipo.
- Juntos: SUSE Virtualization pone la infraestructura (VMs y clústeres bajo demanda) y Rancher Prime la convierte en una nube privada con autoservicio, que además gobierna los clústeres de bare metal, de las sedes, de la nube pública y los AKS, EKS o GKE que ya tengan. Un modelo operativo, una seguridad, una consola.
- Enlazar con la estrategia de la Región: modernizar servicio a servicio sin abrir un silo nuevo cada vez.
-->

---
layout: s
title: Qué es una VM por dentro
sources:
  - { label: KubeVirt, url: "https://kubevirt.io/" }
---

<div class="dia" style="gap:14px;padding-top:4px">
  <div class="row" style="height:64px">
    <div class="blk out fog"><b>Quién la pide</b><small>Consola, Rancher, API, Terraform o Git</small></div>
    <div class="arrow">➔</div>
    <div class="blk out"><b>VirtualMachine</b><small>objeto de Kubernetes en YAML</small></div>
    <div class="arrow">➔</div>
    <div class="blk out"><b>KubeVirt</b><small>controlador que la hace realidad</small></div>
    <div class="arrow">➔</div>
    <div class="blk" style="background:var(--suse-mint);border:1.5px solid var(--suse-jungle)"><b>Pod virt-launcher</b><small>QEMU/KVM: la VM corre aquí dentro</small></div>
  </div>
  <div class="band" style="background:var(--suse-fog);border:1px solid var(--suse-fog)">
    <div class="band-head"><b style="font-weight:600">Disco de la VM: volumen de SUSE Storage</b><span style="color:var(--suse-jungle);font-weight:600">3 réplicas por defecto, cada una en un nodo distinto</span></div>
    <div class="row" style="height:46px">
      <div class="blk" style="border:1.5px solid var(--suse-jungle);display:grid;place-items:center"><b>Réplica en nodo 1</b></div>
      <div class="blk" style="border:1.5px solid var(--suse-jungle);display:grid;place-items:center"><b>Réplica en nodo 2</b></div>
      <div class="blk" style="border:1.5px solid var(--suse-jungle);display:grid;place-items:center"><b>Réplica en nodo 3</b></div>
    </div>
  </div>
  <div class="band" style="background:var(--suse-pine);color:var(--suse-white);text-align:center;padding:12px">
    <b style="font-weight:600;color:var(--suse-mint);font-size:13.5px">Como es un objeto de Kubernetes, la VM hereda lo mismo que un contenedor</b><br>
    <span style="font-size:12px">API, RBAC, GitOps, métricas, alertas y copias</span>
  </div>
</div>

<!--
[6:05-7:05] La idea que explica todo lo demás. Una VM en SUSE Virtualization es un objeto de Kubernetes de tipo VirtualMachine. KubeVirt, el controlador, la convierte en un pod llamado virt-launcher, y dentro de ese pod corre QEMU/KVM: la misma tecnología de virtualización que usan los grandes proveedores de nube. El disco es un volumen de SUSE Storage con tres réplicas en nodos distintos.

Por qué importa: como la VM es un objeto más de Kubernetes, hereda sin esfuerzo adicional lo que ya existe para contenedores. Los mismos permisos, la misma API, GitOps, métricas, alertas y copias. No hay dos mundos que operar.

Y una precisión: SUSE Virtualization no es KubeVirt a pelo. KubeVirt es el motor; la plataforma añade el almacenamiento, la red, la consola, las actualizaciones y el soporte que lo convierten en algo que se opera en producción.
-->

---
layout: s
title: Almacenamiento para VMs
lead: Integrado de serie, o la cabina que ya tienen
sources:
  - { label: Almacenamiento de terceros en SUSE Virtualization, url: "https://documentation.suse.com/cloudnative/virtualization/v1.8/en/storage/csidriver.html" }
  - { label: Copias y restauración, url: "https://docs.harvesterhci.io/v1.8/vm/backup-restore" }
  - { label: Cifrado de volúmenes, url: "https://docs.harvesterhci.io/v1.8/volume/volume-security" }
  - { label: Catálogo de certificación de SUSE (PCSC), url: "https://www.suse.com/pcsc/home#search?productName=&sortOrder.sortOrder=1&partnerName=&platforms=1031&certifications=4&categories=17" }
---

<div class="g3 with-lead">
<div class="card c-pine">

### SUSE Storage integrado

- Bloque distribuido, 3 réplicas por defecto
- Volúmenes e imágenes cifrados
- Snapshots y copias programadas a S3 o NFS
- Restaurar VMs en otro clúster

</div>
<div class="card c-jungle">

### Validado por SUSE

- NFS: con migración en caliente
- Ceph RBD con Rook: migración y snapshots
- Imágenes, discos de arranque y de datos

</div>
<div class="card c-midnight">

### Cabinas externas (CSI)

- Discos de arranque, de datos e imágenes
- Certificadas: Dell, HPE, NetApp, Portworx, Hitachi y más
- El driver debe soportar expansión, snapshots, clonado y RWX
- Copias con Velero, Veeam Kasten o CloudCasa

</div>
</div>

<!--
[7:05-7:50] El almacenamiento es la pregunta número uno de quien viene de VMware con una SAN.
- SUSE Storage (Longhorn) viene incluido: bloque distribuido y replicado entre nodos, snapshots y copias a S3 o NFS.
- Validado por la ingeniería de SUSE: NFS (con migración en caliente, sin snapshot ni copia de VM), Rook Ceph RBD (migración en caliente y snapshot, sin copia de VM) y LVM local (complemento experimental en 1.8; GA anunciado para 1.9.1, sin migración en caliente).
- Cualquier cabina con driver CSI que cumpla los requisitos sirve para discos de datos desde la 1.2 y para discos de arranque e imágenes desde la 1.5. RWX es necesario para la migración en caliente. Multipath disponible desde la 1.4.3 (desactivado por defecto).
- Motor V2 de Longhorn (SPDK/NVMe): experimental en 1.8, no para producción.
- Ojo: la copia integrada de VMs solo cubre volúmenes de SUSE Storage. Para volúmenes en cabinas externas se usan herramientas de partner: Velero con plugin KubeVirt, Veeam Kasten o CloudCasa.
-->

---
layout: s
title: Cuando algo falla, y cuando toca mantener
sources:
  - { label: Mantenimiento de hosts, url: "https://docs.harvesterhci.io/v1.8/host/" }
  - { label: Actualizaciones, url: "https://docs.harvesterhci.io/v1.8/upgrade/index" }
---

<div class="g6" style="margin-top:8px;height:calc(100% - 8px)">
<div class="card c-pine">

### Cae un nodo

- Sus VMs arrancan en otro nodo

</div>
<div class="card c-jungle">

### Los datos

- 3 réplicas en nodos distintos, se reconstruyen solas

</div>
<div class="card c-midnight">

### Mantenimiento

- Un clic vacía el nodo con migración en caliente

</div>
<div class="card c-mint">

### Actualizaciones

- Un clic, nodo a nodo, VMs migradas sin parada

</div>
<div class="card c-fog">

### Copias

- A S3 o NFS, restaurables en otro clúster

</div>
<div class="card c-waterhole">

### Lo que no migra

- VMs con PCI passthrough: apagado planificado

</div>
</div>

<!--
Lo que de verdad preguntan quienes operan.

Si un nodo cae, la plataforma lo detecta y, por defecto a los 15 segundos, empieza a mover sus VMs; si el nodo está apagado, las VMs se reinician en otro. Los datos no se pierden porque cada volumen tiene tres réplicas en nodos distintos, y la réplica perdida se reconstruye sola.

Para mantenimiento de hardware, el modo mantenimiento vacía el nodo migrando las VMs en caliente. Las actualizaciones de la plataforma se lanzan desde la consola y van nodo a nodo; las VMs que pueden migrar no sufren parada. Dos matices honestos: no hay vuelta atrás de versión, así que se prueba antes en un entorno de preproducción; y las VMs con dispositivos PCI en passthrough no migran en caliente, se apagan en una ventana planificada. Si gestiona Rancher, se actualiza Rancher primero.
-->

---
layout: s
title: Soberanía digital y operación desconectada
sources:
  - { label: Instalación desconectada, url: "https://docs.harvesterhci.io/v1.8/airgap" }
  - { label: Rancher desconectado, url: "https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade/other-installation-methods/air-gapped-helm-cli-install" }
  - { label: Liz con Ollama, url: "https://documentation.suse.com/cloudnative/rancher-ai/latest/fr/quick-start.html" }
  - { label: SUSE Sovereign Premium Support, url: "https://www.suse.com/services/sovereign-premium-support/" }
  - { label: Autoevaluación de soberanía, url: "https://www.suse.com/cloud-sovereignty-framework-assessment/" }
---

<div class="g4" style="margin-top:8px;height:calc(100% - 8px)">
<div class="card c-pine">

### En sus instalaciones

- Todo en su CPD, sin depender de una nube
- Sus datos y sus VMs no salen de su red
- Volúmenes cifrados con su propia clave

</div>
<div class="card c-jungle">

### Sin conexión

- La ISO trae todo para instalar sin internet
- Rancher, también en instalación desconectada
- Registro privado y NTP propios

</div>
<div class="card c-midnight">

### Sin dependencia comercial

- Código abierto y estándares: KVM y Kubernetes
- La hoja de ruta no la decide un solo proveedor
- Opción de soporte con ingenieros en la UE

</div>
<div class="card c-mint">

### IA local

- Liz, el asistente de IA de Rancher
- Modelos locales con Ollama, en su red
- Las preguntas no salen de su infraestructura

</div>
</div>

<!--
[10:35-11:20] La ISO de SUSE Virtualization incluye todo lo necesario para instalarse sin conexión; para los clústeres invitados hace falta un registro privado y NTP interno. Rancher también tiene instalación desconectada.

Sobre el código abierto, el mensaje es soberanía, no precio: la plataforma se basa en estándares abiertos y código auditable, así que la administración no queda atada a las decisiones comerciales de un único fabricante. SUSE aporta lo que convierte ese código en una plataforma de producción: soporte, parches, certificaciones y un equipo que responde.

IA local: Liz se conecta a modelos locales o desconectados (Ollama), así que las preguntas sobre su infraestructura no salen de su red.

Para medirlo: SUSE publica desde enero de 2026 una autoevaluación basada en el EU Cloud Sovereignty Framework (32 preguntas, 8 objetivos, nivel SEAL de 0 a 4, informe en PDF). Es una buena tarea para después de la charla, y encaja con un taller de arquitectura.
-->

---
layout: s
title: "CSCS: VMs y Kubernetes con dos ingenieros"
chapter: Casos
sources:
  - { label: "SUSE, caso de éxito CSCS", url: "https://www.suse.com/success/cscs/" }
  - { label: "CSCS, status and perspective (KEK, 2025)", url: "https://conference-indico.kek.jp/event/340/contributions/6783/attachments/4843/7949/KEK-CSCS%20Joint%20Meeting%202025%20-%20Tsukuba%20-%20Dino%20Conciatore.pdf" }
  - { label: "SUSE, CSCS en KubeCon Europe (abr 2025)", url: "https://www.suse.com/blog/modernizing-without-limits-integrating-kubernetes-with-certified-storage-at-kubecon-europe/" }
---

<div class="g3" style="margin-top:8px;height:calc(100% - 8px)">
<div class="card c-pine">
<div class="kicker">01 · Desafío</div>

### Quiénes son

- Centro nacional suizo de supercomputación, en Lugano
- Unas 800 aplicaciones en servicio

### El reto

- 2 ingenieros de plataforma para 80-90 usuarios
- HPC, Kubernetes y una red segura con 20 VLAN

</div>
<div class="card c-midnight">
<div class="kicker">02 · Solución</div>

### SUSE Virtualization

- 16 servidores, unas 300 VMs
- Actualizaciones con migración en caliente

### SUSE Rancher Prime

- Más de 50 clústeres desde una consola
- En SUSE Virtualization, bare metal y HPC

</div>
<div class="card c-pine">
<div class="kicker">03 · Impacto</div>
<div class="big">-80%</div>
<p>Menos tiempo en mantener</p>
<div class="big">+70%</div>
<p>Despliegues más rápidos</p>

### Operación

- Sin caídas significativas en años
- Todo se redespliega en menos de un día

</div>
</div>

<style>
.big { font-size: 30px; font-weight: 600; color: var(--suse-jungle); line-height: 1; margin-top: 4px; }
</style>

<!--
[12:20-13:20] Empiezo por la organización que más se parece a ustedes: CSCS, el centro nacional suizo de supercomputación, un servicio público. Gestiona sus VMs y Kubernetes con dos ingenieros de plataforma, dedica en torno a un 80 % menos de tiempo a la infraestructura y despliega un 70 % más rápido.

Otros casos europeos, si preguntan: Thales Alenia Space, en el sector aeroespacial: hasta tres veces menos coste y un aprovisionamiento más de un 90 % más rápido en 14 sedes de 7 países. FIS-ASP está reconstruyendo 1000 sistemas SAP en infraestructura soberana alemana certificada ISO 27001 y NIS2, y evitó una renovación que más que duplicaba el coste. BTC, en energía, ejecuta sus contadores inteligentes sobre SUSE Virtualization; su responsable de sistemas dice que con la plataforma anterior predecir el coste era casi imposible.

Fuentes: SUSE, caso de éxito CSCS; SUSE, 16 de septiembre de 2026 (Thales Alenia Space, FIS-ASP) y 19 de enero de 2026 (BTC). Cifras publicadas por SUSE y sus clientes.
-->

---
layout: s
title: Lo que dicen los analistas
sources:
  - { label: Gartner Contenedores, url: "https://www.suse.com/es-es/blog/suse-leader-2026-gartner-magic-quadrant-container-management/" }
  - { label: Forrester 2025, url: "https://www.suse.com/blog/suse-named-leader-in-the-2025-forrester-wave/" }
  - { label: Gartner Virtualización, url: "https://www.suse.com/blog/suse-visionary-2026-gartner-magic-quadrant-server-virtualization-platforms/" }
  - { label: Gartner DHI, url: "https://www.suse.com/blog/suse-visionary-2026-gartner-magic-quadrant-distributed-hybrid-infrastructure/" }
---

<div class="g4" style="margin-top:6px;height:calc(100% - 30px)">
<div class="card c-pine">
<div class="kicker">Gartner</div>

### Gestión de contenedores

<div class="tag">LEADER (2024, 2025, 2026)</div>
<p>Evaluado: <b>SUSE Rancher Prime</b></p>
<p style="opacity:.7">Magic Quadrant, septiembre 2026</p>
</div>
<div class="card c-pine">
<div class="kicker">Forrester</div>

### Contenedores multi-cloud

<div class="tag">LEADER</div>
<p>Evaluado: <b>SUSE Rancher Prime</b></p>
<p style="opacity:.7">Forrester Wave, Q3 2025</p>
</div>
<div class="card c-midnight">
<div class="kicker">Gartner</div>

### Virtualización de servidores

<div class="tag" style="background:var(--suse-waterhole);color:var(--suse-white)">VISIONARY</div>
<p>Evaluado: <b>SUSE Virtualization</b></p>
<p style="opacity:.7">Magic Quadrant, septiembre 2026</p>
</div>
<div class="card c-midnight">
<div class="kicker">Gartner</div>

### Infraestructura híbrida

<div class="tag" style="background:var(--suse-waterhole);color:var(--suse-white)">VISIONARY</div>
<p><b>VMs, contenedores, edge e IA</b></p>
<p style="opacity:.7">Magic Quadrant, septiembre 2026</p>
</div>
</div>

<div class="legal">Gartner, Magic Quadrant for Container Management, 2 Sep 2026; Magic Quadrant for Server Virtualization Platforms, 14 Sep 2026; Magic Quadrant for Distributed Hybrid Infrastructure, 7 Sep 2026. Gartner does not endorse any vendor, product or service depicted in its research publications. GARTNER and MAGIC QUADRANT are trademarks of Gartner, Inc. and/or its affiliates. Forrester does not endorse any company, product, brand, or service included in its research publications.</div>

<!--
Cuatro evaluaciones independientes, y cuentan la misma historia que hemos contado hoy: la gestión de Kubernetes ya es referente, y la virtualización integrada es la apuesta de futuro.

Gestión de contenedores (Gartner, 2 de septiembre de 2026): SUSE es Leader por tercer año seguido, con SUSE Rancher Prime. Comparte cuadrante con Google, AWS, Microsoft, Red Hat, Alibaba Cloud y Huawei. Es el reconocimiento más fuerte y es justo la pieza que gestiona todo su Kubernetes.

Forrester Wave Multicloud Container Platforms (Q3 2025): Leader con SUSE Rancher Prime, junto a Red Hat y Nutanix. Forrester la describe como "a longtime open-source leader" y destaca su "flexible packaging" y un "above-par roadmap".

Virtualización de servidores (Gartner, 14 de septiembre de 2026): Visionary. Los Leaders son Broadcom (VMware), Nutanix, Microsoft y Red Hat. Para una plataforma tan joven, entrar como Visionary indica que Gartner valora la dirección: VMs y contenedores con un solo plano de control.

Infraestructura híbrida distribuida (Gartner, 7 de septiembre de 2026): Visionary. Es la categoría de quien quiere desplegar y gestionar infraestructura donde decida: CPD propio, edge o nube. Encaja con lo que buscan las administraciones: soberanía y control.

Si preguntan por qué Visionary y no Leader en virtualización: es honesto decir que la capacidad de ejecución se mide por cuota y madurez de mercado, y ahí VMware y Nutanix llevan décadas. La visión es lo que se valora.
-->

---
layout: s
base: statement-mint-geeko
look: mint
logo: green
title: Juntos, se moderniza mejor.
chapter: Cierre
nav: false
geeko: { pose: hanging-right-confident, anim: swing, x: 58, y: -12, w: 36 }
---

<!--
[14:05-14:35] Vuelvo a la mano levantada del principio. Sus VMs no son un problema que haya que esconder: son el punto de partida. Con SUSE Virtualization siguen funcionando; con Rancher Prime, todo su Kubernetes, aquí o en la nube, se gestiona igual. Juntos, se moderniza mejor.
-->

---
layout: statement-landscape
title: ¿Preguntas?
nav: false
---

<!--
Abrir preguntas.
-->

---
layout: closing-geeko
title: Gracias
nav: false
---

---
layout: s
base: section-dark
title: Anexo
subtitle: Para las preguntas
chapter: Anexo
nav: dark
---

---
layout: s
title: Modernizar servicio a servicio
geeko: { pose: climbing-confident, anim: sway, x: 82, y: -1, w: 15 }
sources:
  - { label: Importar VMs, url: "https://docs.harvesterhci.io/v1.8/advanced/addons/vmimport" }
  - { label: Clústeres RKE2 sobre SUSE Virtualization, url: "https://docs.harvesterhci.io/v1.8/rancher/node/rke2-cluster" }
  - { label: Proveedor de Terraform, url: "https://registry.terraform.io/providers/harvester/harvester/latest" }
  - { label: Destinos de Fleet, url: "https://fleet.rancher.io/how-tos-for-users/gitrepo-targets" }
---

<div class="g4" style="margin-top:8px;height:calc(100% - 8px)">
<div class="card c-pine">

### 1. Traer

- Importar desde VMware, OpenStack u OVA
- Discos convertidos y redes mapeadas
- Por oleadas, lo crítico al final

</div>
<div class="card c-jungle">

### 2. Operar como código

- Cada VM, un objeto de Kubernetes en YAML
- Versionada en Git o con Terraform
- Copias programadas, mismo RBAC y métricas

</div>
<div class="card c-midnight">

### 3. Modernizar por partes

- Web y API a contenedores
- RKE2 desde Rancher, sin hardware nuevo
- La base de datos sigue en su VM

</div>
<div class="card c-mint">

### 4. Automatizar

- Fleet desde Git: YAML, Helm o Kustomize
- Por etiquetas o grupos de clústeres
- Ajustes por sede sin duplicar código

</div>
</div>

<!--
Esto es lo que entendemos por modernizar: no es un proyecto de reescritura, es un camino donde cada paso aporta valor por sí mismo. Las VMs no son el pasado; ejecutan hoy los servicios críticos y siguen siendo ciudadanas de primera en la plataforma.

Ejemplo concreto, un servicio de tramitación con tres VMs: web, aplicación y base de datos.
1. Traer: las tres VMs pasan a SUSE Virtualization tal cual, por oleadas, empezando por desarrollo y pruebas.
2. Operar como código: cada VM es un objeto de Kubernetes, se describe en YAML, se versiona en Git o con Terraform, y hereda los permisos, las métricas y las alertas de la plataforma.
3. Modernizar por partes: cuando el equipo lo decide, la web y la API pasan a contenedores en un clúster RKE2 creado desde Rancher sobre la misma plataforma. La base de datos sigue en su VM, sin prisa.
4. Automatizar: Fleet aplica la misma configuración a todos los clústeres desde Git.

Mensaje: modernizan al ritmo de cada servicio, no al ritmo de una renovación. Y muchas VMs seguirán siendo VMs, y está bien.
-->

---
layout: s
title: SUSE Virtualization hoy, y lo que llega
lead: En producción con la 1.8; la 1.9 ya está publicada
sources:
  - { label: Notas de la versión 1.8.1, url: "https://documentation.suse.com/cloudnative/virtualization/v1.8/en/release-notes/v1.8.1.html" }
  - { label: Versión 1.9.0, url: "https://github.com/harvester/harvester/releases/tag/v1.9.0" }
  - { label: vGPU y MIG, url: "https://docs.harvesterhci.io/v1.8/advanced/vgpusupport" }
---

<div class="g2 with-lead">
<div class="card c-pine">

### Hoy, en producción (1.8)

- HA y migración en caliente de VMs Linux y Windows
- Discos que cambian de almacenamiento en caliente
- Almacenamiento integrado o su cabina (CSI)
- vGPU con NVIDIA MIG y PCI passthrough
- Roles granulares y SUSE Observability

</div>
<div class="card c-mint">

### Llega con la 1.9

- Migraciones en caliente en paralelo, por lotes
- GPU para contenedores junto a VMs con vGPU
- Windows optimizado de serie, con Sysprep
- Nodos nuevos sin carga hasta estar listos
- Balanceadores en redes secundarias

</div>
</div>

<!--
Lo que la plataforma ya hace en producción y hacia dónde va. Cadencia: una versión menor cada 4 meses y parches cada 2.

Hoy, con la 1.8 (Prime, soporte hasta el 29 de diciembre de 2027): HA y migración en caliente de VMs Linux y Windows; migración en caliente de discos entre proveedores de almacenamiento sin parada, por ejemplo de SUSE Storage a su cabina o al revés; almacenamiento integrado o cualquier cabina con driver CSI; vGPU y passthrough PCI, incluida vGPU con NVIDIA MIG desde la 1.7 (una GPU A100, H100 o H200 repartida en instancias aisladas por hardware para varias VMs); roles específicos de SUSE Virtualization en Rancher Prime (VMs, PCI, USB, vGPU) e integración con SUSE Observability. Todo esto figura como plenamente soportado en las notas de la 1.8.1.

Lo que llega con la 1.9 (publicada el 16 de septiembre de 2026 como versión de comunidad): migraciones en caliente en paralelo desde la consola; GPU para contenedores con el NVIDIA GPU Operator en unos nodos mientras otros siguen con vGPU para VMs; Windows con disco SCSI, Hyper-V enlightenments y ficheros Sysprep; nodos que se unen acordonados (install.cordoned) hasta terminar su configuración; y balanceadores de clústeres invitados en redes secundarias. Componentes: KubeVirt 1.8, Longhorn 1.12, RKE2 1.36.

Para producción: la propia nota de la 1.9.0 no recomienda actualizar todavía y anuncia los arreglos en la 1.9.1, que será la versión Prime.

Si preguntan por lo que aún madura: Kube-OVN (microsegmentación, VPC) y Auto Balance son experimentales, Longhorn V2 está en Technical Preview en la 1.9, y el vTPM de la 1.8 no es persistente (BitLocker no).
-->

---
layout: s
title: Kubernetes en producción, día 2
sources:
  - { label: Actualizaciones, url: "https://ranchermanager.docs.rancher.com/getting-started/installation-and-upgrade/upgrade-and-roll-back-kubernetes" }
  - { label: Snapshots de etcd, url: "https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/backup-restore-and-disaster-recovery/back-up-rancher-launched-kubernetes-clusters" }
  - { label: Escaneos CIS, url: "https://documentation.suse.com/cloudnative/rancher-manager/v2.13/en/security/compliance-scans/compliance-scans.html" }
---

<div class="g6" style="margin-top:8px;height:calc(100% - 8px)">
<div class="card c-pine">

### Actualizaciones

- RKE2 por lotes, con drenado y snapshot previo

</div>
<div class="card c-jungle">

### Copias de etcd

- Periódicas por defecto, en local o en S3

</div>
<div class="card c-midnight">

### Cumplimiento

- Escaneos CIS con informe por clúster

</div>
<div class="card c-mint">

### Observabilidad

- Métricas, paneles y alertas incluidos

</div>
<div class="card c-fog">

### Identidad y permisos

- AD, LDAP, Entra ID, SAML; roles por proyecto

</div>
<div class="card c-waterhole">

### GitOps

- Fleet aplica la misma configuración a todos

</div>
</div>

<!--
Instalar Kubernetes es fácil; operarlo en producción es lo difícil. Esto es lo que Rancher Prime resuelve para todos sus clústeres, estén donde estén.

Actualizaciones: se cambia la versión de RKE2 en Rancher y los nodos se actualizan por lotes; por defecto, como máximo un 10 % de los workers a la vez, con drenado configurable. Se recomienda un snapshot de etcd antes, y si algo falla hay una opción para restaurar etcd y la versión anterior de Kubernetes.

Copias: los clústeres creados por Rancher hacen snapshots periódicos de etcd por defecto; se pueden enviar a S3 para recuperar el clúster aunque se pierdan todos los nodos de etcd.

Cumplimiento: escaneos CIS con kube-bench que generan un informe por clúster. Observabilidad: métricas, paneles y alertas por clúster. Identidad: Active Directory, LDAP, Entra ID, SAML u OIDC, con roles por clúster y proyecto. Y GitOps con Fleet: la configuración vive en Git y Rancher la aplica igual en todos los clústeres.

Los clústeres de SUSE Virtualization se importan igual y heredan la misma autenticación y RBAC; la 1.8 añade roles granulares por espacio de nombres.
-->

---
layout: s
title: Salir de VMware sin saltos al vacío
lead: Tres caminos soportados, según el volumen y la ventana de corte
geeko: { pose: climbing-confident, anim: sway, x: 82, y: -1, w: 15, delay: 0.4 }
sources:
  - { label: Importador de VMs, url: "https://documentation.suse.com/cloudnative/virtualization/v1.8/en/add-ons/vm-import-controller.html" }
  - { label: Comparativa de herramientas, url: "https://documentation.suse.com/cloudnative/virtualization/v1.9/en/virtual-machines/vm-migration/vendor-compatibility-comparison.html" }
  - { label: Subir imágenes, url: "https://docs.harvesterhci.io/v1.8/image/upload-image" }
---

<div class="g3 with-lead">
<div class="card c-pine">

### Importación integrada

- Incluida en SUSE Virtualization
- Desde vCenter, OpenStack u OVA
- En frío, con conversión de discos y mapeo de redes

</div>
<div class="card c-jungle">

### Coriolis

- De Cloudbase Solutions, sin agentes
- En caliente, con corte planificado
- Desde vSphere, AWS, Azure y GCP

</div>
<div class="card c-midnight">

### Manual

- Subir imágenes qcow2, raw o ISO
- Los VMDK se convierten antes
- Para casos especiales o pocas VMs

</div>
</div>

<!--
La página de producto habla de "three supported migration paths from VMware": integrado, Coriolis y manual.
- Importador integrado (vm-import-controller): migración en frío. Apaga la VM de origen (apagado ordenado 60 s y luego forzado), convierte los discos a raw usando un volumen temporal del doble del disco mayor, y mapea las redes (las NICs sin mapear van a la red de gestión). Necesita acceso a vCenter. Problemas conocidos: nombres de VM no válidos en Kubernetes, VMs sin VMware Tools, y hay que ajustar la evictionStrategy para poder migrar en caliente después.
- Coriolis (Cloudbase Solutions): appliance externo sin agentes, migración en caliente con corte por fases. Validado de Harvester 1.3 a 1.8.0. SUSE soporta la plataforma; Cloudbase, el appliance.
- Manual: subir imágenes qcow2, raw o ISO (por URL, fichero o volumen). VMDK no se acepta directamente: convertir antes.
- En camino: SUSE VM Migration Toolkit (basado en Forklift), experimental y documentado para la 1.9.
- SUSE ofrece Virtualization Evaluation Services para evaluar el despliegue.
-->

---
layout: s
title: Seguridad de la base a la aplicación
sources:
  - { label: RKE2 y FIPS 140-3, url: "https://documentation.suse.com/cloudnative/rke2/latest/en/security/fips3_support.html" }
  - { label: SUSE Security, url: "https://www.suse.com/products/rancher/security/" }
  - { label: Rancher Prime, url: "https://www.suse.com/products/rancher/" }
---

<div class="g4" style="margin-top:8px;height:calc(100% - 8px)">
<div class="card c-pine">

### Sistema inmutable

- SUSE Linux Micro, Inmutable y transaccional, sin deriva de configuración

</div>
<div class="card c-jungle">

### Kubernetes reforzado

- RKE2 con guías CIS y modo FIPS 140-3

</div>
<div class="card c-midnight">

### Zero Trust

- SUSE Security protege y segmenta en tiempo de ejecución

</div>
<div class="card c-mint">

### Cadena de suministro

- Registro Prime con imágenes firmadas, SBOM, VEX y SLSA 3

</div>
</div>

<!--
Cuatro capas de defensa.
- FIPS: RKE2 tiene modo de cumplimiento FIPS 140-3 (solo el CNI Canal está recompilado para FIPS).
- SUSE Security (NeuVector): "the only fully open source, Zero Trust container security platform".
- Cadena de suministro: el registro de Rancher Prime ofrece aplicaciones firmadas con SBOM/VEX y SLSA nivel 3.
-->

---
layout: s
title: Redes compatibles
sources:
  - { label: Redes en detalle, url: "https://docs.harvesterhci.io/v1.8/networking/deep-dive" }
  - { label: Balanceador, url: "https://docs.harvesterhci.io/v1.8/networking/loadbalancer" }
  - { label: Harvester Load Balancer, url: "https://github.com/harvester/load-balancer-harvester" }
  - { label: Kube-OVN VPC, url: "https://docs.harvesterhci.io/v1.8/networking/kubeovn-vpc" }
---

<div class="g6" style="margin-top:8px;height:calc(100% - 8px)">
<div class="card c-pine">

### Red de gestión

- CNI Canal (Calico y Flannel)
- Bonding active-backup o 802.3ad

</div>
<div class="card c-jungle">

### Redes de VMs

- Multus y bridge CNI
- VLAN con y sin etiqueta, por grupo de nodos

</div>
<div class="card c-midnight">

### Tráfico separado

- Redes dedicadas de almacenamiento y migración
- Jumbo frames, MTU igual en toda la red

</div>
<div class="card c-mint">

### Rendimiento

- SR-IOV y passthrough de NICs
- Con PCI no hay migración en caliente

</div>
<div class="card c-waterhole">

### Balanceador

- Harvester Load Balancer con kube-vip
- Capa 4 TCP/UDP, IP por DHCP o pool

</div>
<div class="card c-fog">

### Experimental en 1.8

- Kube-OVN: overlay, VPC y microsegmentación
- DHCP gestionado

</div>
</div>

<!--
Lo que necesita su red física y lo que ofrece la plataforma.
- Red física: 10 GbE como mínimo en producción, pareja de NICs en bonding para la red de gestión y para cada red de clúster, y puertos de switch en trunk con las VLAN.
- La red de gestión (mgmt) viene integrada. Las redes de clúster se aplican a grupos de nodos; sobre ellas se crean redes de VM por VLAN.
- CNIs: la red de gestión usa Canal (Calico + Flannel); por su overlay, las NICs de VM en mgmt tienen MTU 1450 (50 bytes de cabecera). Las redes VLAN de VM usan Multus + bridge CNI: cada VM puede tener una NIC en gestión y varias en redes bridge. Kube-OVN (1.15) es el CNI secundario para overlay/VPC, experimental.
- Clústeres invitados RKE2: su propio CNI; RKE2 incluye Canal (por defecto), Calico, Cilium y Flannel, más Multus.
- Balanceador: controlador Harvester Load Balancer, que con kube-vip y el cloud provider de Harvester (CCM) hace de proveedor cloud. IP por DHCP o pool, varios listeners, selección de VMs por etiquetas, comprobaciones de salud TCP. Limitaciones: mismo namespace, solo IPv4, necesita guest agent (no Windows), la IP solo se expone en la red de los hosts (hay que enrutar desde fuera).
- MTU: por defecto 1500; jumbo frames posibles, pero todos los nodos de una red de clúster con el mismo MTU, y cambiarlo exige parar las VMs afectadas.
- Red de almacenamiento: saca el tráfico de SUSE Storage a su propia VLAN (en 1.8 también para volúmenes RWX). Red de migración: aísla el tráfico de migración en caliente.
- SR-IOV y passthrough PCI con el complemento pcidevices-controller. Ojo: una VM con dispositivo PCI no se puede migrar en caliente.
- Experimental en 1.8: todo lo que usa Kube-OVN (overlay, VPC, peering, NAT, ACLs de subred y aislamiento por NetworkPolicy, también el underlay L3 nuevo de la 1.8) y el DHCP gestionado con pools de IP. Hoy no es para producción.
-->

---
layout: s
title: De VMware a SUSE, concepto a concepto
sources:
  - { label: Documentación de SUSE Virtualization 1.8, url: "https://docs.harvesterhci.io/v1.8/" }
  - { label: VMs Windows, url: "https://docs.harvesterhci.io/v1.8/vm/create-windows-vm" }
---

<div class="g6" style="margin-top:8px;height:calc(100% - 8px)">
<div class="card c-pine">

### vCenter → Rancher Prime

- Consola, RBAC y ciclo de vida de todo

</div>
<div class="card c-jungle">

### ESXi → SUSE Virtualization

- KVM con KubeVirt, Windows y vGPU; vTPM sin BitLocker

</div>
<div class="card c-midnight">

### vSAN → SUSE Storage

- Discos locales replicados, 3 copias por defecto

</div>
<div class="card c-mint">

### vMotion y HA → integrados

- Migración en caliente y reinicio en otro nodo

</div>
<div class="card c-fog">

### DRS → Auto Balance

- Reparto automático de VMs, experimental en 1.8

</div>
<div class="card c-waterhole">

### NSX → Kube-OVN

- Overlay, VPC y microsegmentación, experimental

</div>
</div>

<!--
Para quien viene de VMware, el mapa mental. Las cuatro primeras equivalencias están maduras y en producción: Rancher Prime hace el papel de vCenter, cada nodo de SUSE Virtualization el de un ESXi, SUSE Storage el de vSAN, y la migración en caliente y el reinicio automático cubren vMotion y vSphere HA.

Las dos últimas las digo con transparencia: el equivalente a DRS (Auto Balance) y a NSX (Kube-OVN) existen pero son experimentales en la 1.8. Para redes de producción hoy se usan VLANs con Multus, que cubren la gran mayoría de casos.

Windows: Windows 11 funciona con UEFI, Secure Boot y vTPM, pero en la 1.8 el vTPM no es persistente (su estado se borra al apagar la VM), así que no se debe activar BitLocker.
-->

---
layout: s
title: Almacenamiento certificado por SUSE
sources:
  - { label: Catálogo de certificación de SUSE (PCSC), url: "https://www.suse.com/pcsc/home#search?productName=&sortOrder.sortOrder=1&partnerName=&platforms=1031&certifications=4&categories=17" }
  - { label: Documentación de almacenamiento de terceros, url: "https://documentation.suse.com/cloudnative/virtualization/v1.8/en/storage/csidriver.html" }
---

<div class="g6" style="margin-top:8px;height:calc(100% - 8px)">
<div class="card c-pine">

### Dell

- PowerFlex, PowerMax y PowerStore (CSI 2.16)

</div>
<div class="card c-jungle">

### HPE

- Alletra, Primera y Nimble (HPE CSI 3.2)

</div>
<div class="card c-midnight">

### NetApp

- Trident 25.10 para ONTAP y Element

</div>
<div class="card c-mint">

### Portworx

- Portworx Enterprise 3.6 y PX-CSI 26.1

</div>
<div class="card c-fog">

### Hitachi y Huawei

- Hitachi VSP y VSP One
- Huawei OceanStor

</div>
<div class="card c-waterhole">

### Infinidat, LINBIT y Lenovo

- InfiniBox (CSI 2.24)
- LINBIT SDS 2.8
- Lenovo ThinkSystem DG y DM

</div>
</div>

<!--
Catálogo oficial de certificación de SUSE (PCSC), filtrado por plataforma SUSE Virtualization, certificación "SUSE Certified" y categoría Storage & CSI: 13 productos a 22 oct 2026.
- Dell: CSI PowerFlex 2.16.0, CSI PowerMax 2.16.0, PowerStore CSI 2.16.0 / 2.14.
- HPE CSI Driver for Kubernetes 3.2.0 / 2.5.2: Alletra MP B10000, Alletra 5000/6000/9000, Primera, Nimble.
- NetApp Trident CSI 25.10 (ONTAP, Element y otros).
- Portworx Enterprise 3.6.1 / 3.4.0.1 y Portworx CSI (PX-CSI) 26.1.
- Hitachi Storage Plug-in for Containers (VSP, VSP One), Huawei CSI (OceanStor), Infinidat InfiniBox CSI 2.24.0, LINBIT SDS 2.8, Lenovo ThinkSystem DG y DM.
- El catálogo no indica contra qué versión de SUSE Virtualization se certificó cada producto: revisar el catálogo antes de comprometer una combinación concreta.
- Los fabricantes pueden certificarse con el programa "SUSE Certified Storage for Virtualization" (storage-validator, desde la 1.6.1). Si su cabina no está, se puede pedir al fabricante.
- Copias de volúmenes externos: Velero, Veeam Kasten, CloudCasa; CloudCasa y Commvault aparecen en el catálogo para SUSE Virtualization.
-->

---
layout: s
title: VMs como código
sources:
  - { label: Terraform, url: "https://registry.terraform.io/providers/harvester/harvester/latest" }
---

<div class="g2" style="grid-template-columns:1fr 1.05fr;align-items:center">
<div style="font-size:15px">

- API de Kubernetes: kubectl y cualquier herramienta estándar
- Terraform: proveedor oficial para VMs, redes e imágenes
- Declarativo: la VM es un fichero que se versiona en Git
- Cambios revisados y auditados como cualquier código

</div>
<div>

```hcl
resource "harvester_virtualmachine" "web" {
  name      = "web-01"
  namespace = "produccion"
  cpu       = 2
  memory    = "4Gi"
  efi       = true

  network_interface {
    name         = "nic-1"
    network_name = "produccion/vlan-100"
  }

  disk {
    name       = "rootdisk"
    type       = "disk"
    size       = "40Gi"
    bus        = "virtio"
    boot_order = 1
    image      = "default/sles-16"
  }
}
```

</div>
</div>

<!--
Para los equipos que ya automatizan. Todo lo que se hace en la consola se puede hacer por API, porque es la API de Kubernetes. Hay un proveedor oficial de Terraform que cubre máquinas virtuales, redes, imágenes y volúmenes. A la derecha, una VM completa en veinte líneas: CPU, memoria, red en una VLAN y disco desde una imagen.

El resultado es que una VM deja de ser un ticket y pasa a ser un fichero en Git, con revisión, historial y auditoría.
-->

---
layout: s
title: Seguridad de la base a la aplicación
sources:
  - { label: RKE2 y FIPS 140-3, url: "https://documentation.suse.com/cloudnative/rke2/latest/en/security/fips3_support.html" }
  - { label: SUSE Security, url: "https://www.suse.com/products/rancher/security/" }
  - { label: Rancher Prime, url: "https://www.suse.com/products/rancher/" }
---

<div class="g4" style="margin-top:8px;height:calc(100% - 8px)">
<div class="card c-pine">

### Sistema inmutable

- SUSE Linux Micro, sin deriva de configuración

</div>
<div class="card c-jungle">

### Kubernetes reforzado

- RKE2 con guías CIS y modo FIPS 140-3

</div>
<div class="card c-midnight">

### Confianza cero

- SUSE Security protege y segmenta en tiempo de ejecución

</div>
<div class="card c-mint">

### Cadena de suministro

- Registro Prime con imágenes firmadas, SBOM, VEX y SLSA 3

</div>
</div>

<!--
Cuatro capas de defensa.
- FIPS: RKE2 tiene modo de cumplimiento FIPS 140-3 (solo el CNI Canal está recompilado para FIPS).
- SUSE Security (NeuVector): "the only fully open source, Zero Trust container security platform".
- Cadena de suministro: el registro de Rancher Prime ofrece aplicaciones firmadas con SBOM/VEX y SLSA nivel 3.
-->

---
layout: s
title: Dimensionado de partida
sources:
  - { label: Requisitos de hardware 1.8, url: "https://docs.harvesterhci.io/v1.8/install/requirements" }
  - { label: Nodo testigo, url: "https://docs.harvesterhci.io/v1.8/advanced/witness" }
---

<div class="g4" style="margin-top:8px;height:calc(100% - 8px)">
<div class="card c-pine">

### Por nodo, en producción

- 16 núcleos y 64 GB de RAM como mínimo
- SSD o NVMe, 500 GB o más, 5000 IOPS

</div>
<div class="card c-jungle">

### Red

- 10 GbE, gestión en bond de 2 NICs
- 2 NICs más para VMs, troncal con VLANs

</div>
<div class="card c-midnight">

### Topología

- 3 nodos para alta disponibilidad
- 2 nodos más un testigo ligero que no guarda datos

</div>
<div class="card c-mint">

### Capacidad útil

- Con 3 réplicas, un tercio del disco bruto
- Mismas CPUs en todos los nodos para migrar

</div>
</div>

<!--
Para estimar antes de una prueba de concepto. Mínimos de producción según la documentación de la 1.8: 16 núcleos con virtualización por hardware, 64 GB de RAM y discos SSD o NVMe de 500 GB o más, mejor 1 TB, con al menos 5000 IOPS aleatorias por disco. Red de 10 GbE, la de gestión en bond de dos NICs y otras dos para las redes de VMs.

Alta disponibilidad con tres nodos. Para sedes pequeñas, dos nodos más un testigo que solo participa en el quórum y no guarda datos; en ese caso los volúmenes se configuran con dos réplicas.

Dos reglas de dimensionado: con tres réplicas, la capacidad útil es aproximadamente un tercio del disco bruto; y todos los nodos deben tener la misma CPU para que la migración en caliente funcione. La instalación nueva en 1.8 requiere arranque UEFI.
-->

---
layout: s
title: Lo que dicen los analistas
sources:
  - { label: Gartner Contenedores, url: "https://www.suse.com/es-es/blog/suse-leader-2026-gartner-magic-quadrant-container-management/" }
  - { label: Forrester 2025, url: "https://www.suse.com/blog/suse-named-leader-in-the-2025-forrester-wave/" }
  - { label: Gartner Virtualización, url: "https://www.suse.com/blog/suse-visionary-2026-gartner-magic-quadrant-server-virtualization-platforms/" }
  - { label: Gartner DHI, url: "https://www.suse.com/blog/suse-visionary-2026-gartner-magic-quadrant-distributed-hybrid-infrastructure/" }
---

<div class="g4" style="margin-top:6px;height:calc(100% - 30px)">
<div class="card c-pine">

### Gartner: gestión de contenedores

- Leader en 2024, 2025 y 2026
- Evaluado: SUSE Rancher Prime
- Magic Quadrant, septiembre 2026

</div>
<div class="card c-jungle">

### Forrester: contenedores multicloud

- Leader en la Forrester Wave
- Evaluado: SUSE Rancher Prime
- Q3 2025

</div>
<div class="card c-midnight">

### Gartner: virtualización de servidores

- Visionary
- Evaluado: SUSE Virtualization
- Magic Quadrant, septiembre 2026

</div>
<div class="card c-waterhole">

### Gartner: infraestructura híbrida

- Visionary
- VMs, contenedores, edge e IA en una plataforma
- Magic Quadrant, septiembre 2026

</div>
</div>

<div class="legal">Gartner, Magic Quadrant for Container Management, 2 Sep 2026; Magic Quadrant for Server Virtualization Platforms, 14 Sep 2026; Magic Quadrant for Distributed Hybrid Infrastructure, 7 Sep 2026. Gartner does not endorse any vendor, product or service depicted in its research publications. GARTNER and MAGIC QUADRANT are trademarks of Gartner, Inc. and/or its affiliates. Forrester does not endorse any company, product, brand, or service included in its research publications.</div>

<!--
Cuatro evaluaciones independientes: la gestión de Kubernetes ya es referente, y la virtualización integrada es la apuesta de futuro. Detalle en las notas de la slide de analistas de la charla.
-->

---
layout: s
title: Dónde encaja hoy, y dónde todavía no
lead: Empezar por lo maduro, pilotar lo demás
sources:
  - { label: Complementos, url: "https://docs.harvesterhci.io/v1.8/advanced/addons" }
  - { label: VMs Windows, url: "https://docs.harvesterhci.io/v1.8/vm/create-windows-vm" }
  - { label: Kube-OVN VPC, url: "https://docs.harvesterhci.io/v1.8/networking/kubeovn-vpc" }
---

<div class="g3 with-lead">
<div class="card c-pine">

### Hoy, en producción

- VMs Linux y Windows con HA y migración en caliente
- Redes VLAN y almacenamiento integrado o cabina CSI
- Clústeres RKE2 bajo demanda desde Rancher

</div>
<div class="card c-mint">

### Con un piloto antes

- VMs con vGPU o PCI passthrough
- Su cabina concreta: confirmar certificación
- Copias de cabinas externas con herramienta de partner

</div>
<div class="card c-fog">

### Todavía no

- Microsegmentación y VPC con Kube-OVN
- Reparto automático de VMs (Auto Balance)
- Windows con BitLocker (vTPM no persistente)

</div>
</div>

<!--
La slide que un responsable de IT necesita para decidir sin riesgo. A la izquierda, lo que está en producción en la 1.8 y cubre la mayoría de las VMs de una administración. En el centro, lo que funciona pero conviene validar con sus cargas: passthrough y vGPU (no migran en caliente), su modelo de cabina y las copias de volúmenes externos. A la derecha, lo que hoy no recomendaría para producción: Kube-OVN y Auto Balance son experimentales, y el vTPM no es persistente, así que BitLocker no.

Traducido a plan: empezar por desarrollo, pruebas y servicios no críticos; migrar por oleadas; las cargas críticas al final, cuando el equipo ya opera la plataforma con soltura. Nadie apaga un sistema crítico un viernes por la tarde.
-->

---
layout: s
title: Los tres frenos, con respuesta
---

<div class="g3" style="margin-top:10px;height:calc(100% - 10px)">
<div class="card c-pine">

### Coste

- Servidores estándar, sin cabina obligatoria
- Suscripción con soporte, previsible año a año
- Comparativa con su renovación antes de decidir

</div>
<div class="card c-jungle">

### Complejidad

- Una consola para VMs y Kubernetes
- Mismas políticas y RBAC en todo
- Un equipo, formado con laboratorio guiado

</div>
<div class="card c-midnight">

### Dependencia

- Código abierto y estándares: KVM, Kubernetes
- Sus datos y sus VMs, en su CPD
- SUSE como socio que responde de la plataforma

</div>
</div>

<!--
Cierro el círculo con los tres frenos del principio.

Coste: servidores estándar y almacenamiento integrado, sin cabina obligatoria, y una suscripción que se planifica año a año, sin paquetes que cambian en cada renovación. No doy cifras en la sala: lo honesto es un dimensionado con comparativa frente a su renovación real.

Complejidad: una consola, las mismas políticas, y un equipo. Sus administradores de VMware no empiezan de cero: lo que ya saben de máquinas virtuales sigue valiendo, y un laboratorio guiado les lleva de un mundo al otro.

Dependencia: código abierto sobre estándares, en su CPD, con SUSE como socio que responde con soporte, parches y certificaciones. Esa es la diferencia con cambiar un propietario por otro.
-->
