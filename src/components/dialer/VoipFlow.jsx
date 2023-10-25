import { useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const NodePosition = () => {
    let initial = 0
    initial += 200

    return initial
}

const initialNodes = [
  { id: '1', position: { x: 0, y: 100 }, data: { label: '1' } },
  { id: '2', position: { x: 200, y: 100 }, data: { label: '2' } },
  { id: '3', position: { x: 400, y: 100 }, data: { label: '3' } },
  { id: '4', position: { x: 600, y: 100 }, data: { label: '4' } },
];



const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function VoipFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ height: 800 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default VoipFlow;
