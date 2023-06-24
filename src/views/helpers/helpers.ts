import { Prof } from './helpersTypes';

export function listaProfs(profs: Prof[]) {
  console.log(profs);
  const lista = profs.map((p) => `<li>${p.nome} ${p.sala}</li>`).join('\n');
  return `<ul>${lista}</ul>`;
}

export function showErrors(errors: any[], field:string){
  if (!errors) return ''
  const error = errors.find(e => e.path === field);
  if (error) return error.message;
  return '';
}