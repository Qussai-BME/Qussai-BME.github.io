type AxisStage = { label: string; detail: string };

const defaultStages: AxisStage[] = [
  { label: "Signal", detail: "source and measurement" },
  { label: "Representation", detail: "protocol and interpretation" },
  { label: "Action", detail: "bounded next step" },
];

export function RouteAxis({ context, stages = defaultStages }: { context: string; stages?: AxisStage[] }) {
  return <div className="route-axis" aria-label={`${context}: signal to representation to action`}>
    <span className="route-axis-pulse" aria-hidden="true"><i></i><i></i><i></i></span>
    <span className="route-axis-context">{context}</span>
    {stages.map((stage, index) => <span className="route-axis-step" key={stage.label}>
      {index > 0 && <i aria-hidden="true" />}
      <b>{stage.label}</b><small>{stage.detail}</small>
    </span>)}
  </div>;
}
