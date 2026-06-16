import AnimatedList from "./AnimatedList";



interface DepartmentPeopleListProps {
    items: string[];
    onItemSelect?: (item: string, index: number) => void;
}

export default function DepartmentPeopleList({ items, onItemSelect }: DepartmentPeopleListProps) {
    return (
        <>
            <AnimatedList items={items} onItemSelect={onItemSelect} />


        </>
    );
}