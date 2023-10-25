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
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../app/api/apiSlice';

import { useGetQueueQuery, useGetPositionQuery } from '../../features/dialer/queue/queueApiSlice';




/* . ORIGINAIS
const initialNodes = [
  { id: '1', position: { x: 0, y: 100 }, data: { label: '1' } },
  { id: '2', position: { x: 200, y: 100 }, data: { label: '2' } },
  { id: '3', position: { x: 400, y: 100 }, data: { label: '3' } },
  { id: '4', position: { x: 600, y: 100 }, data: { label: '4' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];
*/

const initialNodes = [
  { id: '1', position: { x: 0, y: 100 }, data: { label: '1' } },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
];


function QueueFlow() {

  const { data: queues, isSuccess: queueSuccess } = useGetQueueQuery()
  const { data: positiones, isSuccess: positionesSuccess } = useGetPositionQuery(undefined, { pollingInterval: 4000, refetchOnMountOrArgChange: true })

  const dispatch = useDispatch()



  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  console.log('nodes pure:', nodes)

  // console.log('nodes:', nodes[0]['position'])


  const nodeObjs = []

  positiones && positiones.map((positione) => {
    nodeObjs.push({ id: positione['priority'], position: { x: 0, y: 100 }, data: { label: positione['channel_id'] }})
  })

   
  useEffect(() => {
    console.log('USEEFFECT:', nodeObjs)
    setNodes(nodeObjs)
  }, [onNodesChange])
  

  // console.log('nodeObjs', nodeObjs)


  const UpdateNodes = () => {
    dispatch(apiSlice.util.invalidateTags(['Queue']))
  }

  if(queueSuccess) {
    console.log('queues:', queues)
  }

  if(positionesSuccess) {
    console.log('positiones', positiones)
  }

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div>
      <div>
        <button onClick={UpdateNodes}>Update Queues</button>
      </div>
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
    </div>
  );
}

export default QueueFlow;
