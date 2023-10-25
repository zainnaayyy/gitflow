import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDispatch } from "react-redux";
import { apiSlice } from "../../app/api/apiSlice";
import {
  useGetQueueQuery,
  useGetPositionQuery,
} from "../../features/dialer/queue/queueApiSlice";

const initialNodes = [
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
    type: "input",
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [
  { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
];

function QueueFlow() {

  const { data: queues, isSuccess: queueSuccess } = useGetQueueQuery();
  const { data: positiones, isSuccess: positionesSuccess } =
    useGetPositionQuery(undefined, {
      pollingInterval: 4000,
      refetchOnMountOrArgChange: true,
    });

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const nodeObjs = []

  positiones && positiones.map((positione) => {
    nodeObjs.push({ id: positione['priority'], position: { x: 0, y: 100 }, data: { label: positione['channel_id'] }})
  })

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const buttonChange = () => {
    setNodes([
      {
        id: "1",
        data: { label: "Hello" },
        position: { x: 50, y: 50 },
        type: "input",
      },
      {
        id: "2",
        data: { label: "World" },
        position: { x: 200, y: 200 },
      },
    ]);
  };

  useEffect(() => {
    console.log('USEEFFECT:', nodeObjs)
    setNodes(nodeObjs)
  }, [])

  return (
    <div style={{ height: "100%" }}>
      <div>
        <button onClick={buttonChange}> Change Position</button>
      </div>
      <div style={{ height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default QueueFlow;
