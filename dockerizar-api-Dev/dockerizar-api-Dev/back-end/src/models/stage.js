import mongoose from 'mongoose';

const stageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  options: [{
    text: {
      type: String,
      required: true,
    },
    nextStage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stage',
    },
  }],
});

const Stage = mongoose.model('Stage', stageSchema);

export { Stage };
