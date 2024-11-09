import { Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [],
  template: `
    <div
      class="container-fluid content d-flex align-items-center justify-content-center text-white"
    >
      <div class="text-center">
        <img
          src="https://cdn.pixabay.com/photo/2016/04/24/13/24/error-1349562_1280.png"
          alt="Error 404"
          class="img-fluid mb-4 error-image"
        />
        <h2 class="mb-4">Página no encontrada</h2>
        <p class="lead mb-5">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <a class="link">Volver al inicio</a>
      </div>
    </div>
  `,
  styles: [
    `
      .content {
        height: calc(100vh - 74px); /* 74px = altura del navbar de bootstrap */
        overflow-y: auto;
      }
      .error-image {
        max-width: 300px;
        height: auto;
      }
      .link {
        color: #fff;
        font-weight: 500;
        font-size: 1.2rem;
      }
      .link:hover {
        text-decoration: none;
        color: #ff6347;
        cursor: pointer;
      }
      @media (max-width: 576px) {
        .error-image {
          max-width: 200px;
        }
      }
    `,
  ],
})
export class NotFoundComponent {}
