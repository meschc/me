"use client";

import React, { useState } from "react";
import { 
  FolderIcon, 
  FolderOpenIcon, 
  FileIcon 
} from "lucide-react";

export type FileEntry = {
  name: string;
  children?: Record<string, FileEntry>;
};

export const fileTree: Record<string, FileEntry> = {
  "meschc": {
    name: "meschc",
    children: {
      "about.tsx": {
        name: "about.tsx"
      },
      "projects": {
        name: "projects",
        children: {
          "generator.tsx": {
            name: "generator.tsx"
          },
          "vertor.tsx": {
            name: "vertor.tsx"
          }
        }
      }
    }
  }
};

interface FileTreeItemProps {
  name: string;
  entry: FileEntry;
  depth?: number;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({ 
  name, 
  entry, 
  depth = 0 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = entry.children && Object.keys(entry.children).length > 0;
  
  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center gap-1 hover:text-blue-500 cursor-pointer font-mono text-sm text-neutral-700 dark:text-neutral-200`}
        onClick={toggleOpen}
        style={{ paddingLeft: `${depth * 0.5}rem` }}
      >
        {hasChildren ? (
          isOpen ? <FolderOpenIcon size={16} /> : <FolderIcon size={16} />
        ) : (
          <FileIcon size={16} />
        )}
        <span>{name}</span>
      </div>
      
      {isOpen && hasChildren && (
        <div className="ml-2">
          {Object.entries(entry.children || {})
            .sort(([, a], [, b]) => {
              // Сортировка: сначала папки, затем файлы
              const aIsDir = Boolean(a.children);
              const bIsDir = Boolean(b.children);
              
              if (aIsDir && !bIsDir) return -1;
              if (!aIsDir && bIsDir) return 1;
              
              return a.name.localeCompare(b.name);
            })
            .map(([childName, childEntry]) => (
              <FileTreeItem 
                key={childName} 
                name={childName} 
                entry={childEntry} 
                depth={depth + 1} 
              />
            ))}
        </div>
      )}
    </div>
  );
};

export const FileTree: React.FC = () => {
  return (
    <div className="absolute top-4 left-4 p-2 bg-white/50 dark:bg-black/50 rounded-md backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
      {Object.entries(fileTree).map(([name, entry]) => (
        <FileTreeItem key={name} name={name} entry={entry} />
      ))}
    </div>
  );
}; 