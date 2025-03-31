import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Template {
  id: string;
  title: string;
  description: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
  likes: number;
  downloads: number;
  rating: number;
  pricing: 'FREE' | 'PRO';
  createdAt: string;
}

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Link href={`/templates/${template.id}`} className="hover:underline">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{template.title}</h3>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {template.description}
            </p>
          </div>
          {template.pricing === 'PRO' ? (
            <span className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-xs px-2 py-1 rounded">
              PRO
            </span>
          ) : (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded dark:bg-green-900 dark:text-green-100">
              FREE
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {template.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.slug}`}
              className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-2 py-1 rounded"
            >
              {tag.name}
            </Link>
          ))}
          {template.tags.length > 3 && (
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              +{template.tags.length - 3}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
              {template.author.avatar ? (
                <Image
                  src={template.author.avatar}
                  alt={template.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {template.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <Link href={`/users/${template.author.username}`} className="text-sm text-gray-700 dark:text-gray-300 hover:underline">
              {template.author.name}
            </Link>
          </div>
          
          <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 text-sm">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{template.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>{template.likes}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>{template.downloads}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 