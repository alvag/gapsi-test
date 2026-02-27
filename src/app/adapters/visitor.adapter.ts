// Patrón de diseño: Adapter
// Transforma la respuesta de la API de visitantes al modelo de dominio interno
import { VisitorData, VisitorResponse } from '../interfaces/visitor.interface';

export class VisitorAdapter {
  static fromResponse(res: VisitorResponse): VisitorData {
    return res.data;
  }
}
