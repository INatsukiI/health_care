export type GraphData = {
  labels: string[];
  datasets: (
    | {
        type: "line";
        label: string;
        data: number[];
        borderColor: string;
        borderWidth: number;
        fill: boolean;
        backgroundColor?: undefined;
      }
    | {
        type: "bar";
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        fill?: undefined;
      }
  )[];
};
