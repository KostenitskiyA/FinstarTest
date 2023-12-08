import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {CreatedObject} from "../types/CreatedObject";
import {useCreateObjectsMutation} from "../store/modules/objects-api";

const objectForm = () => {
    const [object, setObject] = useState<CreatedObject>({code: 0, value: ''});
    const [objects, setObjects] = useState<CreatedObject[]>([]);
    const [createObjects, result] = useCreateObjectsMutation()

    const codeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setObject({...object, code: +event.target.value});
    }

    const valueInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setObject({...object, value: event.target.value});
    }

    const createObjectHandler = () => {
        setObjects([...objects, object]);
        setObject({code: 0, value: ''});
    }

    const deleteObjectHandler = (index: number) => {
        const separate = [...objects];
        separate.splice(index, 1);
        setObjects(separate);
    }

    const sendObjectsHandler = () => {
        createObjects(objects);
        setObjects([]);
    }

    return (
        <div style={{width: "50%"}}>
            <h2>Форма создания объектов</h2>
            <Form style={{marginBottom: "20px"}}>
                <Form.Group className="mb-3" controlId="codeInput">
                    <Form.Label>Код</Form.Label>
                    <Form.Control type="number"
                                  value={object.code}
                                  onChange={codeInputHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="valueInput">
                    <Form.Label>Значение</Form.Label>
                    <Form.Control type="text"
                                  value={object.value}
                                  onChange={valueInputHandler}/>
                </Form.Group>
                <Button onClick={createObjectHandler}>Добавить объект</Button>
            </Form>

            <div style={{marginBottom: "20px"}}>
                {objects.map((object, index) => (
                    <div key={index} style={{display: "flex", flexDirection: "row"}}>
                        <div style={{marginRight: "20px"}}>
                            Объект {index}: {object.code} - {object.value}
                        </div>

                        <Button onClick={() => deleteObjectHandler(index)}>Удалить</Button>
                    </div>
                ))}
            </div>
            <Button disabled={objects.length === 0} onClick={sendObjectsHandler}>Добавить объекты</Button>
        </div>
    );
}

export default objectForm;