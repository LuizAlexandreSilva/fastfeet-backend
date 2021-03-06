import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'delivery',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Deliveryman, { foreignKey: 'deliveryman_id' });
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id' });
    this.belongsTo(models.File, { foreignKey: 'signature_id' });
  }
}

export default Delivery;
