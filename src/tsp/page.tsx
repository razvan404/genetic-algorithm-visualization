import { Overlay, Sections } from '@/core';

function TspPage() {
    return (
        <Overlay backgroundColor="rgba(253, 249, 128, 0.4)">
            <Sections
                sections={[
                    {
                        id: 'section1',
                        component: <h1>Section 1</h1>,
                    },
                    {
                        id: 'section2',
                        component: <h1>Section 2</h1>,
                    },
                    {
                        id: 'section3',
                        component: <h1>Section 3</h1>,
                    },
                ]}
            />
        </Overlay>
    );
}

export default TspPage;
