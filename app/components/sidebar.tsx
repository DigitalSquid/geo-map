interface SidebarProps {
  children: React.ReactNode;
  resetFilters: () => void;
}

const Sidebar = (props: SidebarProps) => {
  return (
    <div className='flex-1 w-1/5 relative'>
      <header className='p-4 text-xl leading-4 text-center font-semibold'>
        Geo Meta Map
      </header>
      {props.children}
      <div className='absolute p-4 bottom-0 w-full text-right '>
        <button className='bg-grey-dark px-4 py-2' onClick={props.resetFilters}>
          Reset all selections
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
