import { getHotel } from "../../shared/hotelApi";

export default function Dashboard() {
  return (
    <div className="h-auto w-2/3 rounded bg-orange-200 p-10">
      <p className="mt-6 mb-4 text-lg font-light leading-relaxed text-neutral-800">
        Esta é a página principal do dashboard. Aqui vai ser colocado:
      </p>
      <ul className="mt-6 mb-4 list-inside list-disc text-lg font-light leading-relaxed text-neutral-800">
        <li>uma tabela com as próximas visitas por data crescente</li>
        <li>
          quartos disponíveis, os quartos atualmente ocupados, o número de
          quartos indispoíveis e o número total de hotéis
        </li>
        <li>
          Valor total de vendas com gráfico e dados de total de vendas e valor
          da comissão(lucro)
        </li>
      </ul>
    </div>
  );
}
