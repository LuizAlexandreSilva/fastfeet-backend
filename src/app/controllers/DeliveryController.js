import * as Yup from 'yup';
import Delivery from '../models/Delivery';

class DeliveryController {
  async index(req, res) {
    return res.json(await Delivery.findAll());
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      deliveryman_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
    });

    if (!(await schema.isValid())) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const delivery = await Delivery.create(req.body);

    // TODO: enviar email para entregador

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().schema({
      product: Yup.string(),
      start_date: Yup.date(),
      end_date: Yup.date(),
      canceled_at: Yup.date(),
    });

    if (!(await schema.isValid())) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    const updatedDelivery = await delivery.update(req.body);

    return res.json(updatedDelivery);
  }

  async delete(req, res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }

    const deletedDelivery = await delivery.destroy();
    if (deletedDelivery === 0) {
      return res.status(400).json({ error: 'Error during delete operation' });
    }

    return res.json({ success: 'Delivery successfully deleted' });
  }
}

export default new DeliveryController();
