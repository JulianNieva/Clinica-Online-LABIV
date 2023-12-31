import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit{

  usuario: any = null;
  esPaciente: boolean = false;
  loading: boolean = false;

  especialistasList: any[] = [];
  pacientesList: any[] = [];
  nuevoArrayDeTurnos: any[] = [];
  activeEspecialista: any = null;
  activePaciente: any = null;
  speciality: any = null;
  specialistSelectionMenu: boolean = true;
  patientSelectionMenu: boolean = false;
  turnsSelectionMenu: boolean = false;

  arrayEspecialistas:any[] = []
  especialidadMenuSeleccion:boolean = true;
  listadoEspecialidades:any[] = []

  currentSpecialistTurnList: any[] = [];
  turnosAMostrar: any[] = [];
  turnosDeUnDiaAMostrar: any[] = [];
  diasAMostrar: any[] = [];
  botonPedirTurno: boolean = false;
  turnoSeleccionado: any = null;

  constructor(
    public authService:AuthService,
    private firestoreService:FirestoreService,
    private notificationService:NotificationService
  ) 
  {}
  
  ngOnInit(): void {
    this.loading = true;
    this.authService.user$.subscribe((user:any) => {
      if(user)
      {
        this.usuario = user;
        if(this.authService.esPaciente)
        {
          this.esPaciente = true
        }
        else if(this.authService.esAdmin)
        {
          this.patientSelectionMenu = true
        }

        this.firestoreService.TraerUsuarios().subscribe((users) => {
          if (users) {
            this.especialistasList = users.filter((u:any) => u.perfil == 'Especialista' && u.aprobado);
            this.pacientesList = users.filter((u:any) => u.perfil == 'Paciente');
            this.firestoreService.ObtenerListadoTurnos().subscribe((turnosEspecialista) => {
              this.currentSpecialistTurnList = turnosEspecialista;
              this.loading = false;
            });
            this.firestoreService.TraerEspecialidades().subscribe((esp) => {
              if(esp)
              {
                this.listadoEspecialidades = esp
              }
            });
          } else {
            this.loading = false;
          }
        });
      }
      this.loading = false;
    })
  }

  MostrarEspecialista(esp: any) {
    this.arrayEspecialistas = [];
    this.especialidadMenuSeleccion = false;
    this.speciality = esp;

    for (let i = 0; i < this.especialistasList.length; i++) {
      for (let j = 0; j < this.especialistasList[i].especialidad.length; j++) {
        if(this.speciality.nombre == this.especialistasList[i].especialidad[j].nombre)
        {
          this.arrayEspecialistas.push(this.especialistasList[i]);
        }
      }
    }
  }

  MostrarPaciente(paciente: any) {
    this.patientSelectionMenu = false;
    this.activePaciente = paciente;
  }

  VolverALasEspecialidades(){
    this.especialidadMenuSeleccion = true;
    this.patientSelectionMenu = false;
    this.speciality = null;
    this.turnsSelectionMenu = false;
  }

  showTurns(especialista: any) {
    this.turnsSelectionMenu = true;
    this.activeEspecialista = especialista;
    this.loadFreeHours('');
    this.turnosAMostrar.forEach((t) => {
      this.diasAMostrar.push(t.fecha);
    });

    const aux: any[] = [];
    this.diasAMostrar.forEach((d) => {
      for (let i = 0; i < this.diasAMostrar.length; i++) {
        const fecha = this.diasAMostrar[i];
        if (d.getMonth() == fecha.getMonth() && d.getDate() == fecha.getDate()) {
          if (
            !aux.some((a) => {
              return d.getMonth() == a.getMonth() && d.getDate() == a.getDate();
            })
          ) {
            aux.push(d);
          }
        }
      }
    });
    aux.sort((a, b) => a - b);
    this.diasAMostrar = [...aux];
  }

  loadFreeHours(day: string) {
    const currentDate = new Date();
    const listaTurnosDelEspecialista = this.currentSpecialistTurnList.filter(
      (t) => t.especialista.email == this.activeEspecialista.email
    );
    const turnosEspecialidad =
      listaTurnosDelEspecialista[0].turnos.filter((t: any) => {
        return (
          t.especialidad == this.speciality.nombre &&
          currentDate.getTime() < new Date(t.fecha.seconds * 1000).getTime()
        );
      });

    const turnos15dias: any[] = [];
    for (let i = 0; i < turnosEspecialidad.length; i++) {
      const turno = { ...turnosEspecialidad[i] };
      if (
        new Date(turno.fecha.seconds * 1000).getTime() <=
        currentDate.getTime() + 84600000 * 15 &&
        turno.estado == 'disponible'
      ) {
        turno.fecha = new Date(turno.fecha.seconds * 1000);
        turnos15dias.push(turno);
      }
    }
    this.turnosAMostrar = [...turnos15dias];
  }

  SeleccionarTurno(turno: any) {
    this.turnoSeleccionado = turno;
    this.botonPedirTurno = true;
    this.notificationService.showInfo('Se ha seleccionado un turno', 'Turnos');
  }

  SolicitarTurno() {
    if (this.esPaciente) {
      this.turnoSeleccionado.paciente = this.usuario;
      this.turnoSeleccionado.estado = 'solicitado';
    } else {
      this.turnoSeleccionado.paciente = this.activePaciente;
      this.turnoSeleccionado.estado = 'solicitado';
    }

    for (let i = 0; i < this.currentSpecialistTurnList.length; i++) {
      const turnosEspecialista = this.currentSpecialistTurnList[i];
      const index = turnosEspecialista.turnos.findIndex((t: any) => {
        return (
          new Date(t.fecha.seconds * 1000).getTime() ==
          this.turnoSeleccionado.fecha.getTime() &&
          t.especialidad == this.turnoSeleccionado.especialidad
        );
      });
      turnosEspecialista.turnos[index] = this.turnoSeleccionado;
      this.firestoreService.ActualizarListadoTurnos(turnosEspecialista);
    }
    this.turnosAMostrar = [];
    this.turnosDeUnDiaAMostrar = [];
    this.botonPedirTurno = false;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.notificationService.showSuccess('Se ha solicitado el turno exitosamente', 'Turnos');
      this.loadFreeHours('');
    }, 1000);
  }
}
