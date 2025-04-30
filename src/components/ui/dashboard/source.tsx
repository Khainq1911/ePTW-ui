import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { listTemplateService } from '../../../services/templates.service';
import { useState } from 'react';

interface Props {
    template: string | undefined;
    setTemplate: (value: string) => void;
}

export default function Source({ template, setTemplate }: Props) {
    const [templateOptions, setTemplateOptions] = useState<any>(undefined);

    const listTemplate = async () => {
        try {
            if (!templateOptions) {
                const res = await listTemplateService();
                const options = res?.map((item: { id: number; name: string }) => ({ id: item?.id, name: item?.name }));
                setTemplateOptions(options);
            }
        } catch (error) {}
    };

    const handleChooseTemplate = (e: SelectChangeEvent) => {
        setTemplate(e.target.value as string);
    };

    return (
        <div>
            <h2 className="text-gray-500 my-3">SOURCE</h2>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid size={4}>
                    <h3 className="font-medium">Template:</h3>
                </Grid>
                <Grid size={8}>
                    <FormControl fullWidth sx={{ marginTop: '8px' }}>
                        <InputLabel id="template-select-label">Template</InputLabel>
                        <Select
                            labelId="template-select-label"
                            id="template-select"
                            value={template}
                            label="Template"
                            onChange={handleChooseTemplate}
                            onFocus={listTemplate}
                        >
                            <MenuItem value={''}>
                                <em>None</em>
                            </MenuItem>
                            {templateOptions?.map((item: any) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
}
