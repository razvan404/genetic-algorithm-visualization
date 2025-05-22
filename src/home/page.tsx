import { Overlay } from '@/core';

import Home from './home';

function Page() {
    return (
        <Overlay backgroundColor="rgba(72, 108, 156, 0.3)">
            <Home />
        </Overlay>
    );
}

export default Page;
