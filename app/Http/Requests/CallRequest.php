<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CallRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Validatio ffnRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "required|string|max:255",
            "description" => "string|max:65535|nullable",
            "position" => "sometimes|array",
            "position.x" => "required_with:numeric:strict|min:0",
            "position.y" => "required_with:numeric:strict|min:0",
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Campo nome vazio',
        ];
    }
}
