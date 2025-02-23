import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MainContantComponent } from "../../components/main-contant/main-contant.component";
import { LocatarioService } from '../../services/locatario.service';
import { ILocatarioPaginado } from '../../Types/LocatarioResponse';
import { NgFor } from '@angular/common';
import { FormatarDataPipe } from '../../pipes/data.pipe';
import { AppComponent } from "../../components/icons/moon/moon.component";
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { HlmDialogComponent } from "../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog.component";
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/brain/dialog';
import { HlmDialogContentComponent, HlmDialogDescriptionDirective, HlmDialogFooterComponent, HlmDialogHeaderComponent, HlmDialogTitleDirective } from '@spartan-ng/ui-dialog-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { LabelInputComponent } from "../../components/input/input.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectProprietariosComponent } from "../../components/select-proprietarios/select-proprietarios.component";

@Component({
  selector: 'app-locatario',
  standalone: true,
  imports: [
    MainContantComponent,
    NgFor,
    FormatarDataPipe,
    AppComponent,
    HlmDialogComponent,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmButtonDirective,
    LabelInputComponent,
    ReactiveFormsModule,
    FormsModule,
    SelectProprietariosComponent
],
  templateUrl: './locatario.component.html',
  styleUrl: './locatario.component.css'
})
export class LocatarioComponent implements OnInit, OnDestroy {

  conteudo: any[] = [];
  pagina!: number;
  total!: number;

  private destroy$ = new Subject<void>();

  form: FormGroup

  passwordValue: string = "";

  constructor(
    private service: LocatarioService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nome: ["", [Validators.required, Validators.minLength(6)]],
      cpf: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.carregarDados();
    this.authService.accountChanged$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.carregarDados();
    });
  }

  register() {

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