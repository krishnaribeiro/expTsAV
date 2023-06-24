import {Request, Response} from 'express';
import { Departamentos } from '../models/Departamentos';
const index = async (req: Request, res: Response) => {
    const departamentos = await Departamentos.findAll();
    res.render('departamento/index',{
        departamentos: departamentos.map((d)=> d.toJSON()),
    });
};

const create = async (req: Request, res: Response) => {
    if (req.route.methods.get){
        res.render('departamento/create', {
            csrf: req.csrfToken()
        });
    }else{
        const departamento = req.body;
        try{
            await Departamentos.create(departamento);
            res.redirect('/departamento');
        }catch (err: any){
            console.log(err);
            res.render('departamento/create', {
                departamento,
                errors: err.errors,
                csrf: req.csrfToken()

            });
        }
    }
};
const read = async (req: Request, res: Response) => {
    const departamentoId = req.params.id;
  try {
    const departamento = await Departamentos.findByPk(departamentoId);
    if (departamento) {
      res.render('departamento/read', {
        departamento: departamento.toJSON(),
      });
    } else {
      res.status(404).render('error', {
        message: 'Departamento not found',
      });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).render('error', {
      message: 'Internal server error',
    });
  }
};
const update = async (req: Request, res: Response) => {
    const departamentoId = req.params.id;
  const updatedDepartamento = req.body;
  try {
    const departamento = await Departamentos.findByPk(departamentoId);
    if (departamento) {
      await departamento.update(updatedDepartamento);
      res.redirect('/departamento');
    } else {
      res.status(404).render('error', {
        message: 'Departamento not found',
      });
    }
  } catch (err: any) {
    console.log(err);
    res.render('departamento/update', {
      departamento: updatedDepartamento,
      errors: err.errors,
      csrf: req.csrfToken(),
    });
  }
};
const del = async (req: Request, res: Response) => {
    const departamentoId = req.params.id;
  try {
    const departamento = await Departamentos.findByPk(departamentoId);
    if (departamento) {
      await departamento.destroy();
      res.redirect('/departamento');
    } else {
      res.status(404).render('error', {
        message: 'Departamento not found',
      });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).render('error', {
      message: 'Internal server error',
    });
  }
};

export default {index, create, read, update, del}
