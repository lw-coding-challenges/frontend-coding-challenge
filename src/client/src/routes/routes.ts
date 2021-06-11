const home: IRoute<never> = {
    template: "/",
    build: () => home.template
};

const employeeEdit: IRoute<{id: string}> = {
    template: `/employees/:id`,
    build: (args) => `/employees/${args.id}`
};

export const Routes = {
  home,
  employee: {
      edit: employeeEdit
  }  
}

export interface IRoute<T = unknown> {
    template: string;
    build: (params: T) => string;
}