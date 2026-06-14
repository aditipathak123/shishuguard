import mongoose from "mongoose";

const vaccineSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  scheduledDate: { 
    type: Date, 
    required: true 
  },
  completedDate: { 
    type: Date 
  },
  status: { 
    type: String, 
    enum: ['scheduled', 'completed', 'overdue'], 
    default: 'scheduled' 
  },
  notes: { 
    type: String 
  },
  document: { 
    type: String 
  },
  ageMonths: { 
    type: Number 
  },
  isStandard: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

const Vaccine = mongoose.models.Vaccine || mongoose.model("Vaccine", vaccineSchema);

export default Vaccine;