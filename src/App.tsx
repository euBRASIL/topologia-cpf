import React, { useState } from "react";

interface Node {
  id: string;
  cpf: string;
  connections: string[];
}

interface Link {
  source: string;
  target: string;
}

const NetworkTopology = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "1", cpf: "123.456.789-01", connections: ["2", "3"] },
    { id: "2", cpf: "987.654.321-01", connections: ["1", "4"] },
    { id: "3", cpf: "111.222.333-01", connections: ["1", "4"] },
    { id: "4", cpf: "444.555.666-01", connections: ["2", "3"] },
  ]);

  const [links, setLinks] = useState<Link[]>([
    { source: "1", target: "2" },
    { source: "1", target: "3" },
    { source: "2", target: "4" },
    { source: "3", target: "4" },
  ]);

  const [newNode, setNewNode] = useState<Node>({
    id: "",
    cpf: "",
    connections: [],
  });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleAddNode = () => {
    setNodes([...nodes, newNode]);
    setNewNode({ id: "", cpf: "", connections: [] });
  };

  const handleSelectNode = (node: Node) => {
    setSelectedNode(node);
  };

  const handleAddConnection = (nodeId: string) => {
    if (selectedNode) {
      setLinks([...links, { source: selectedNode.id, target: nodeId }]);
      setNodes(
        nodes.map((node) => {
          if (node.id === selectedNode.id) {
            return { ...node, connections: [...node.connections, nodeId] };
          }
          return node;
        })
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">euBRASIL( CPF )</h1>
      <div className="flex flex-wrap justify-center mb-4">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="bg-blue-500 rounded p-4 m-2 cursor-pointer"
            onClick={() => handleSelectNode(node)}
          >
            <h2 className="text-lg font-bold">{node.cpf}</h2>
            <p className="text-sm">
              Ponto a Ponto: {node.connections.join(", ")}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={newNode.cpf}
          onChange={(e) => setNewNode({ ...newNode, cpf: e.target.value })}
          placeholder="Enter CPF"
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button
          onClick={handleAddNode}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Node
        </button>
      </div>
      {selectedNode && (
        <div className="flex justify-center mb-4">
          <select
            value=""
            onChange={(e) => handleAddConnection(e.target.value)}
            className="p-2 border border-gray-300 rounded mr-2"
          >
            <option value="">Selecion um Nó</option>
            {nodes
              .filter((node) => node.id !== selectedNode.id)
              .map((node) => (
                <option key={node.id} value={node.id}>
                  {node.cpf}
                </option>
              ))}
          </select>
        </div>
      )}
      <div className="flex flex-wrap justify-center">
        {links.map((link) => (
          <div
            key={`${link.source}-${link.target}`}
            className="bg-gray-300 p-2 m-2"
          >
            <p className="text-sm">
              {nodes.find((node) => node.id === link.source)?.cpf} -{" "}
              {nodes.find((node) => node.id === link.target)?.cpf}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkTopology;
