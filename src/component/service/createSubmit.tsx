import * as React from "react";
import {
    Intent,
} from "@blueprintjs/core";
import {
    IconNames,
} from "@blueprintjs/icons";

import {
    store,
} from "@app/store";
import Toaster from "@app/component/toaster";
import Form    from "@app/form/serviceForm";

type Props = {
    e: React.SyntheticEvent<HTMLFormElement>,
    form: Form,
    store: typeof store,
};

const CreateSubmit = async (props: Props) => {
    props.form.nameInUse.value = !!store.service.find(props.form.name.value);

    await props.form.onSubmit(props.e);

    if (props.form.form.hasError) {
        console.log(`Form errors: ${props.form.form.error}`);

        Toaster.show({
            icon: IconNames.ERROR,
            intent: Intent.DANGER,
            message: "The form has errors. Please double check and try again.",
        });

        return;
    }

    store.service.createFromForm(props.form);
};

export default CreateSubmit;
