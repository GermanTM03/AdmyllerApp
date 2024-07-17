interface Props {
    branch: Branch;
}

const WorkshopCard: React.FC<Props> = ({ branch }) => {
    return (
        <div>
            <h3>{branch.businessName}</h3>
            {/* Otros datos */}
        </div>
    );
}
