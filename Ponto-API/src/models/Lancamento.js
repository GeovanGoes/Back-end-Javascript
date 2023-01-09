import mongoose from "mongoose";


const lancamentoSchema = new mongoose.Schema(
    {
        id: {type: String},
        dataHora: {type: Date, required: true},
        usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true}
    }
)

const lancamentos = mongoose.model('lancamentos', lancamentoSchema);

export default lancamentos;