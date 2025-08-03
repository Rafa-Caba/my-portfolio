import { format, formatDistanceToNow } from 'date-fns';
import { Card } from 'react-bootstrap';
import type { Log } from '../types';

interface Props {
    log: Log;
}

export const LogCard = ({ log }: Props) => {
    const formattedDate = log.createdAt
        ? format(new Date(log.createdAt), 'PPpp')
        : 'Unknown date';

    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <Card.Title>
                    🛠 {log.action} <small className="text-muted">({log.method} {log.path})</small>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <strong>By:</strong> {log.user?.name || 'Unknown'}
                </Card.Subtitle>
                <Card.Text>
                    <strong>ID:</strong> {log.user?._id || 'N/A'}
                </Card.Text>
                <Card.Footer className="text-muted">
                    {formatDistanceToNow(formattedDate, { addSuffix: true })}
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};
