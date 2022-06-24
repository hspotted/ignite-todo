import classNames from 'classnames';
import hashids from 'hashids';
import { Check, ClipboardText, PlusCircle, Trash } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { Logo } from './components/Logo';

interface Task {
  id: string;
  title: string;
  isChecked: boolean;
}

export const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: new hashids().encode('1'),
      title: 'Task 1',
      isChecked: true
    },
    {
      id: new hashids().encode('2'),
      title: 'Task 2',
      isChecked: false
    },
    {
      id: new hashids().encode('3'),
      title: 'Task 3',
      isChecked: true
    }
  ]);

  const hasItems = tasks.length > 0;
  const completedTasks = tasks.reduce(
    (prev, current) => (current.isChecked ? (prev += 1) : prev),
    0
  );

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    const task: Task = {
      id: new hashids().encode(tasks.length + 1),
      title: title,
      isChecked: false
    };

    setTasks([...tasks, task]);
    setTitle('');
  }

  function handleCheckTask(id: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) return { ...task, isChecked: !task.isChecked };
      return task;
    });

    setTasks(updatedTasks);
  }

  function handleDeleteTask(id: string) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <>
      <div className="bg-gray-700 h-[200px] flex items-center justify-center">
        <Logo />
      </div>
      <main className="w-full max-w-[736px] mx-auto -mt-[27px]">
        <form
          onSubmit={handleCreateTask}
          className="w-full flex h-[54px] gap-2 align-center p-0"
        >
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            required
            className="outline-none flex-1 bg-gray-500 border border-gray-700 rounded-lg gap-2 p-4 align-center text-gray-300 placeholder-gray-300 focus:border-purple-secondary focus:text-gray-100 transition-colors"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            className="flex align-center justify-center items-center gap-2 p-4 bg-blue-primary rounded-lg hover:bg-blue-secondary transition-colors text-sm"
          >
            Criar <PlusCircle size={16} />
          </button>
        </form>
        <section className="mt-16">
          <div className="flex justify-between">
            <span className="text-sm text-blue-primary font-bold line-heigh-[17px] flex gap-2">
              Tarefas criadas
              <span className="bg-gray-400 py-[2px] px-2 gap-[10px] rounded-[999px] text-xs text-gray-200 font-normal line-height-[15px]">
                {tasks.length}
              </span>
            </span>
            <span className="text-sm text-purple-primary font-bold line-heigh-[17px] flex gap-2">
              Concluídas
              <span className="bg-gray-400 py-[2px] px-2 gap-[10px] rounded-[999px] text-xs text-gray-200 font-normal line-height-[15px]">
                {completedTasks} de {tasks.length}
              </span>
            </span>
          </div>
          <div className="mt-6">
            {hasItems ? (
              <ul className="flex flex-col gap-3">
                {tasks.map((task) => (
                  <li
                    className="w-full flex flex-start p-4 gap-3 bg-gray-500 border border-gray-400 rounded-lg"
                    key={task.id}
                  >
                    <span
                      className={classNames(
                        'w-[24px] h-[24px] border-2 rounded-full flex align-center justify-center items-center text-gray-100 cursor-pointer transition-colors',
                        {
                          'bg-purple-secondary border-purple-secondary opacity-90 hover:bg-purple-primary hover:border-purple-primary':
                            task.isChecked,
                          'border-blue-primary hover:border-blue-secondary hover:bg-blue-secondary hover:bg-opacity-20':
                            !task.isChecked
                        }
                      )}
                      onClick={() => handleCheckTask(task.id)}
                    >
                      {task.isChecked ? (
                        <Check size={14} weight="bold" />
                      ) : (
                        <></>
                      )}
                    </span>
                    <span
                      className={classNames(
                        'flex-1 text-sm leading-5 font-normal text-justify',
                        {
                          'text-gray-300 line-through': task.isChecked,
                          'text-gray-100': !task.isChecked
                        }
                      )}
                    >
                      {task.title}
                    </span>
                    <span>
                      <Trash
                        size={20}
                        className="text-gray-300 cursor-pointer"
                        onClick={() => handleDeleteTask(task.id)}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border border-t-gray-400 border-l-0 border-r-0 border-b-0 rounded-lg flex flex-col justify-center align-center py-16 px-6 g-4 items-center text-gray-300 gap-4">
                <ClipboardText size={56} className="opacity-10" />
                <p className="leading-[22px] text-center">
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <br />
                  Crie tarefas e organize seus itens a fazer
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};
