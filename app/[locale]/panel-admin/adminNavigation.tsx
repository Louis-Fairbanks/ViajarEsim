import type { Navigation } from "@toolpad/core/AppProvider";

export const NAVIGATION: Navigation = [
  {
    kind: "page",
    segment: "panel-admin",
    title: "Inicio",
  },
  {
    title: 'Clientes',
    segment: 'panel-admin',
    children: [
      {
        kind: 'page',
        segment: 'orders',
        title: 'Ordenes',
      },
      {
        kind: 'page',
        segment: 'metricas',
        title: 'Métricas',
      }
    ]
  },
  {
    title: 'KPIs',
    segment: 'panel-admin',
    children: [
      {
        kind: 'page',
        segment: 'rendimiento',
        title: 'Rendimiento',
      },
      {
        kind: 'page',
        segment: 'gastos',
        title: 'Gastos',
      }
    ]
  },
  {
    kind: 'page',
    segment: 'panel-admin/influencers',
    title: 'Influencers',
  },
  {
    kind: 'page',
    segment: 'panel-admin/soporte',
    title: 'Soporte'
  }
  // {
  //   kind: "page",
  //   segment: "panel-admin/purchase-plans",
  //   title: "Purchase Plans",
  //   icon: null,
  //   action: null,
  // },
];
