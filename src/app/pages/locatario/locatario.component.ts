import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainContantComponent } from "../../components/main-contant/main-contant.component";
import { LocatarioService } from '../../services/locatario.service';
import { ILocatarioPaginado } from '../../Types/LocatarioResponse';
import { NgFor } from '@angular/common';
import { FormatarDataPipe } from '../../pipes/data.pipe';
import { AppComponent } from "../../components/icons/moon/moon.component";
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-locatario',
  imports: [MainContantComponent, NgFor, FormatarDataPipe, AppComponent],
  templateUrl: './locatario.component.html',
  styleUrl: './locatario.component.css'
})
export class LocatarioComponent implements OnInit, OnDestroy {
  conteudo: any[] = [];
  pagina!: number;
  total!: number;
  private destroy$ = new Subject<void>();

  constructor(private service: LocatarioService, private authService: AuthService) {}

  ngOnInit() {
    this.carregarDados();
    this.authService.accountChanged$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.carregarDados();
    });
  }

  carregarDados() {
    this.service.getLocatarios(this.pagina).subscribe(
      (res: ILocatarioPaginado) => {
        this.conteudo = res.content;
        this.pagina = res.number;
        this.total = res.totalPages;
      },
      (error) => {
        console.error('Erro ao carregar locatários:', error);
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  mudarPagina(pagina: number) {
    this.service.getLocatarios(pagina).subscribe(
      (res: ILocatarioPaginado) => {
        this.conteudo = res.content;
        this.pagina = res.number;
        this.total = res.totalPages;
      },
      (error) => {
        console.error('Erro ao carregar locatários:', error);
      }
    );
  }
}