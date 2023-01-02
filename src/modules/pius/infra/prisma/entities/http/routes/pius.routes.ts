import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import { Route53Domains } from "aws-sdk";
import { Router } from "express";
import PiusController from "../controllers/PiusController";

const piusRouter = Router();
const piusController = new PiusController


piusRouter.use(ensureAuthenticated);
piusRouter.patch('/:id',piusController.likePiu);
piusRouter.post('/',piusController.create);
piusRouter.get('/',piusController.show);
piusRouter.get('/:id',piusController.showOne);
piusRouter.delete('/:id', piusController.deletePiu);
piusRouter.put('/:id', piusController.update);




export default piusRouter;